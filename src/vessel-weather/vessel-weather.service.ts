import {
  Injectable,
  HttpService,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { VesselWeather } from './schemas/vessel-weather.schema';
import { Model } from 'mongoose';
import { CreateVesselWeatherDto } from './dto/createVesselWeather.dto';
import { VesselPositionService } from 'src/vessel-position/vessel-position.service';
import { Interval } from '@nestjs/schedule';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { VesselPosition } from 'src/vessel-position/interfaces/vessel-position.interface';
import { WeatherValidationPipe } from './pipes/weather-validation.pipe';
import { Weather } from './interfaces/weather.interface';
import { CreateVesselWeatherDtoValidationPipe } from './pipes/create-vessel-weather-dto-validation.pipe';
import * as moment from 'moment';
import { InvalidVesselPositionError } from 'src/vessel-position/errors/invalid-vessel-position-data.error';

@Injectable()
export class VesselWeatherService {
  constructor(
    @InjectModel(VesselWeather.name)
    private vesselWeatherModel: Model<VesselWeather>,
    private vesselPositionService: VesselPositionService,
    private http: HttpService,
    private weatherValidationPipe: WeatherValidationPipe,
    private createVesselWeatherDtoValidationPipe: CreateVesselWeatherDtoValidationPipe,
    private logger: Logger,
  ) {}

  addVesselWeather(createVesselWeatherDto: CreateVesselWeatherDto) {
    const vesselWeather = new this.vesselWeatherModel(createVesselWeatherDto);
    return vesselWeather
      .save()
      .then(data => this.logger.log(data))
      // .catch(error => console.log(error.message));
  }

  async getVesselweather(
    mmsi: string,
    timeStamp: string,
  ): Promise<VesselWeather> {
    const timeWindowMinutes: number =
      parseInt(process.env.TIME_WINDOW_MINUTES) || 60;

    const unixTime = moment.utc(timeStamp).unix();

    const t1 = moment
      .utc(timeStamp)
      .subtract(timeWindowMinutes / 2, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ss');

    const t2 = moment
      .utc(timeStamp)
      .add(timeWindowMinutes / 2, 'minutes')
      .format('YYYY-MM-DDTHH:mm:ss');

    const vesselWeatherPositions = await this.vesselWeatherModel.find({
      timeStamp: { $gte: t1, $lte: t2 },
      mmsi,
    });

    console.log(vesselWeatherPositions);

    let nearestVesselWeatherPosition: VesselWeather = null;
    let smallestTimeDiff = (timeWindowMinutes * 1000) / 2;

    vesselWeatherPositions.forEach(vesselWeatherPosition => {
      const diff = Math.abs(
        unixTime - moment.utc(vesselWeatherPosition.timeStamp).unix(),
      );

      if (diff < smallestTimeDiff) {
        smallestTimeDiff = diff;
        nearestVesselWeatherPosition = vesselWeatherPosition;
      }
    });

    if (!nearestVesselWeatherPosition) {
      throw new NotFoundException('No Weather available for this date');
    }

    return nearestVesselWeatherPosition.toObject({
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret._id;
      },
    });
  }

  @Interval(240000)
  private collectKystverket() {
    this.vesselPositionService.getVesselPositionsKystverket().subscribe(
      vesselPosition => {
        if (vesselPosition) {
          this.fetchWeather(vesselPosition).subscribe(weather => {
            const createVesselWeatherDto = this.createVesselWeatherDtoValidationPipe.transform(
              { ...weather, ...vesselPosition },
            );
            if (createVesselWeatherDto) {
              this.addVesselWeather(createVesselWeatherDto);
            }
          });
        }
      },
      err => console.log(this.logger.error(err, null, 'collectKystverket')),
    );
  }

  @Interval(600000)
  private collectMarineTraffic() {
    this.vesselPositionService.getVesselPositionsMarineTraffic().subscribe(
      vesselPosition => {
        if (vesselPosition) {
          this.fetchWeather(vesselPosition).subscribe(weather => {
            const createVesselWeatherDto = this.createVesselWeatherDtoValidationPipe.transform(
              { ...weather, ...vesselPosition },
            );
            if (createVesselWeatherDto) {
              this.addVesselWeather(createVesselWeatherDto);
            }
          });
        }
      },
      err =>
        this.logger.error(err.message, null, 'collectMarineTraffic'),
    );
  }

  private fetchWeather(vesselPosition: VesselPosition): Observable<Weather> {
    const { lat, lng, mmsi, timeStamp } = vesselPosition;

    return this.http
      .get(
        `https://api.stormglass.io/v2/weather/point?source=sg&params=waveHeight,waterTemperature,windSpeed,windDirection,visibility,cloudCover,precipitation,airTemperature&lat=${lat}&lng=${lng}&start=${timeStamp}&end=${timeStamp}`,
        { headers: { Authorization: process.env.API_KEY } },
      )
      .pipe(map(response => response.data.hours[0]))
      .pipe(map(data => this.weatherValidationPipe.transform(data)));
  }
}

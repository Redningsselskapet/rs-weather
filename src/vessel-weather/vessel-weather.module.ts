import { Module, HttpModule, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VesselWeatherService } from './vessel-weather.service';
import {
  VesselWeather,
  VesselWeatherSchema,
} from './schemas/vessel-weather.schema';
import { VesselPositionModule } from 'src/vessel-position/vessel-position.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WeatherValidationPipe } from './pipes/weather-validation.pipe';
import { CreateVesselWeatherDtoValidationPipe } from './pipes/create-vessel-weather-dto-validation.pipe';
import { VesselWeatherController } from './vessel-weather.controller';

@Module({
  imports: [
    HttpModule.register({
      headers: {
        Authorization: process.env.API_KEY,
      },
    }),
    ScheduleModule.forRoot(),
    VesselPositionModule,
    MongooseModule.forFeature([
      { name: VesselWeather.name, schema: VesselWeatherSchema },
    ]),
  ],
  providers: [
    VesselWeatherService,
    WeatherValidationPipe,
    CreateVesselWeatherDtoValidationPipe,
    Logger
  ],
  controllers: [VesselWeatherController],
})
export class VesselWeatherModule {}

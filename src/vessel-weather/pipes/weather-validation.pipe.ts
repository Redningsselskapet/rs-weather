import {Injectable, PipeTransform } from '@nestjs/common';
import { CreateVesselWeatherDto } from '../dto/create-vessel-weather.dto';
import { plainToClass } from 'class-transformer';
import { WeatherStormGlassDto } from '../dto/weather-stromglass.dto';
import { Weather } from '../interfaces/weather.interface';
import { validate, validateSync } from 'class-validator';

@Injectable()
export class WeatherValidationPipe implements PipeTransform {
  transform(value: any): Weather {
    const weather = plainToClass(WeatherStormGlassDto, value)
    const error = validateSync(weather)
    if (error.length > 1) {
      return null
    }
    return weather
  }
}

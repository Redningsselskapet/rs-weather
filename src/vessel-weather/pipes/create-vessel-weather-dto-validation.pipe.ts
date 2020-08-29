import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateVesselWeatherDto } from '../dto/create-vessel-weather.dto';
import { plainToClass } from 'class-transformer';
import { validate, validateSync } from 'class-validator';

@Injectable()
export class CreateVesselWeatherDtoValidationPipe implements PipeTransform {
  transform(value: any): CreateVesselWeatherDto {
    const createVesselWeatherDto = plainToClass(CreateVesselWeatherDto, value)
    const error = validateSync(createVesselWeatherDto)
    if (error.length > 0) {
      return null
    }
    return createVesselWeatherDto
  }
}

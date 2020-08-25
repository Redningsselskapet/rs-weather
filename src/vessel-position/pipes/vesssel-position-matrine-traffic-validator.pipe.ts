import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { VesselPosition } from '../interfaces/vessel-position.interface';
import { VesselPositionMarineTrafficDto } from '../dto/vessel-position-marine-traffic.dto';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { VesselDataProvider } from '../enums/vessel-data-provider.enum';

@Injectable()
export class VessselPositionMatrineTrafficValidatorPipe implements PipeTransform {
  transform(value: any): VesselPosition {
    value.provider = VesselDataProvider.MARINE_TRAFFIC
    const vesselPosition: VesselPositionMarineTrafficDto = plainToClass(VesselPositionMarineTrafficDto, value, {
      excludeExtraneousValues: true,
    });
    this._validate(vesselPosition);
    return vesselPosition
  }

  private _validate(value: any) {
    const error = validateSync(value);
    if (error.length) {
      throw new Error('koko')
      console.log(error)
    }
  
  }
}

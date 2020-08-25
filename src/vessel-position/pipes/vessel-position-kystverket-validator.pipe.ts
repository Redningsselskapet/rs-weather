import { Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer'
import { VesselPosition } from '../interfaces/vessel-position.interface';
import { VesselDataProvider } from '../enums/vessel-data-provider.enum';
import { VesselPositionKystverketDto } from '../dto/vessel-position-kystverket.dto';
import { validateSync } from 'class-validator';

@Injectable()
export class VesselPositionKystverketValidatorPipe implements PipeTransform {
  transform(value: any): VesselPosition {
    value.provider = VesselDataProvider.KYSTVERKET
    const vesselPosition: VesselPositionKystverketDto = plainToClass(VesselPositionKystverketDto, value, {
      excludeExtraneousValues: true,
    });
    try {
      this._validate(vesselPosition);
      return vesselPosition
    } catch(error) {
      console.log('bad data. Skipping...')
      return null
    }
  }

  private _validate(value: any) {
    const error = validateSync(value);
    if (error.length) {
      throw new Error('Invalid Vessel Position');
    }
  
  }
}

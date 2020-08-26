import { ArgumentMetadata, Injectable, PipeTransform, Logger } from '@nestjs/common';
import { VesselPosition } from '../interfaces/vessel-position.interface';
import { VesselPositionMarineTrafficDto } from '../dto/vessel-position-marine-traffic.dto';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { VesselDataProvider } from '../enums/vessel-data-provider.enum';
import { InvalidVesselPositionError } from '../errors/invalid-vessel-position-data.error';

@Injectable()
export class VessselPositionMatrineTrafficValidatorPipe implements PipeTransform {
  constructor(private logger: Logger) {}
  transform(value: any): VesselPosition {
    value.provider = VesselDataProvider.MARINE_TRAFFIC
    const vesselPosition: VesselPositionMarineTrafficDto = plainToClass(VesselPositionMarineTrafficDto, value, {
      excludeExtraneousValues: true,
    });
    try {
    this._validate(vesselPosition);
    return vesselPosition
    } catch(error) {
      if (error instanceof InvalidVesselPositionError) {
        this.logger.error(
          error.message,
          null,
          VessselPositionMatrineTrafficValidatorPipe.name,
        );
        return null;
      }
      throw error;
    }
  }

  private _validate(value: any) {
    const error = validateSync(value);
    if (error.length) {
      const { constraints } = error[0];
      throw new InvalidVesselPositionError(
        constraints[Object.keys(constraints)[0]],
      );
    }
  
  }
}

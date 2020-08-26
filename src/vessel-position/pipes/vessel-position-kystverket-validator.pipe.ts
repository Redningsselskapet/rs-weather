import {
  Injectable,
  PipeTransform,
  LoggerService,
  Logger,
  Inject,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { VesselPosition } from '../interfaces/vessel-position.interface';
import { VesselDataProvider } from '../enums/vessel-data-provider.enum';
import { VesselPositionKystverketDto } from '../dto/vessel-position-kystverket.dto';
import { validateSync } from 'class-validator';
import { InvalidVesselPositionError } from '../errors/invalid-vessel-position-data.error';

@Injectable()
export class VesselPositionKystverketValidatorPipe implements PipeTransform {
  constructor(private logger: Logger) {}
  transform(value: any): VesselPosition {
    value.provider = VesselDataProvider.KYSTVERKET;
    const vesselPosition: VesselPositionKystverketDto = plainToClass(
      VesselPositionKystverketDto,
      value,
      {
        excludeExtraneousValues: true,
      },
    );
    try {
      this._validate(vesselPosition);
      return vesselPosition;
    } catch (error) {
      if (error instanceof InvalidVesselPositionError) {
        this.logger.error(
          error.message,
          null,
          VesselPositionKystverketValidatorPipe.name,
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

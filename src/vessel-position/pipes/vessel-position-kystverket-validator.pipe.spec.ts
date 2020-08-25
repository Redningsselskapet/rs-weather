import { VesselPositionKystverketValidatorPipe } from './vessel-position-kystverket-validator.pipe';
import { Logger } from '@nestjs/common';

describe('VesselPositionKystverketValidatorPipe', () => {
  it('should be defined', () => {
    expect(new VesselPositionKystverketValidatorPipe(new Logger())).toBeDefined();
  });
});

import { VessselPositionMatrineTrafficValidatorPipe } from './vesssel-position-matrine-traffic-validator.pipe';
import { Logger } from '@nestjs/common';

describe('VessselPositionMatrineTrafficValidatorPipe', () => {
  it('should be defined', () => {
    expect(new VessselPositionMatrineTrafficValidatorPipe(new Logger)).toBeDefined();
  });
});

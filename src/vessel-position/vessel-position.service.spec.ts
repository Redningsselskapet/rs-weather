import { Test, TestingModule } from '@nestjs/testing';
import { VesselPositionService } from './vessel-position.service';
import { HttpService, HttpModule, Logger } from '@nestjs/common';
import { VesselPositionKystverketValidatorPipe } from './pipes/vessel-position-kystverket-validator.pipe';
import { VessselPositionMatrineTrafficValidatorPipe } from './pipes/vesssel-position-matrine-traffic-validator.pipe';

describe('VesselPositionService', () => {
  let service: VesselPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [VesselPositionService, VesselPositionKystverketValidatorPipe, VessselPositionMatrineTrafficValidatorPipe, Logger],
    }).compile();

    service = module.get<VesselPositionService>(VesselPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

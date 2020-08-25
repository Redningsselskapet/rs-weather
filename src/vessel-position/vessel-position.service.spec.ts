import { Test, TestingModule } from '@nestjs/testing';
import { VesselPositionService } from './vessel-position.service';

describe('VesselPositionService', () => {
  let service: VesselPositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VesselPositionService],
    }).compile();

    service = module.get<VesselPositionService>(VesselPositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

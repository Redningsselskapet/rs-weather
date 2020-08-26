import { Test, TestingModule } from '@nestjs/testing';
import { VesselWeatherService } from './vessel-weather.service';
import { VesselPositionKystverketValidatorPipe } from 'src/vessel-position/pipes/vessel-position-kystverket-validator.pipe';
import { Logger } from '@nestjs/common';

describe('VesselWeatherService', () => {
  let service: VesselWeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VesselWeatherService, VesselPositionKystverketValidatorPipe, Logger],
    }).compile();

    service = module.get<VesselWeatherService>(VesselWeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

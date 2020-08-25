import { Test, TestingModule } from '@nestjs/testing';
import { VesselWeatherService } from './vessel-weather.service';

describe('VesselWeatherService', () => {
  let service: VesselWeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VesselWeatherService],
    }).compile();

    service = module.get<VesselWeatherService>(VesselWeatherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

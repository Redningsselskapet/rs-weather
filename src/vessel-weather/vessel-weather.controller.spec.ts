import { Test, TestingModule } from '@nestjs/testing';
import { VesselWeatherController } from './vessel-weather.controller';
import { VesselWeatherService } from './vessel-weather.service';


describe('VesselWeather Controller', () => {
  let controller: VesselWeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VesselWeatherService],
      controllers: [VesselWeatherController],
    }).compile();

    controller = module.get<VesselWeatherController>(VesselWeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

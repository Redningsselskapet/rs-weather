import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, Query, Param } from '@nestjs/common';
import { VesselWeatherService } from './vessel-weather.service';
import { VesselWeather } from './schemas/vessel-weather.schema';

@Controller('vessel-weather')
export class VesselWeatherController {
    constructor(private vesselWeatherService: VesselWeatherService) {}

    @Get('/:mmsi/:timeStamp')
    getVesselWeather(@Param('mmsi') mmsi: string, @Param('timeStamp') timeStamp: string): Promise<VesselWeather> {
        return this.vesselWeatherService.getVesselweather(mmsi, timeStamp  )
    }

    @Get('/:mmsi')
    getVesselWeatherNow(@Param('mmsi') mmsi: string): Promise<any> {
        return Promise.resolve('not implemented')
    }
}

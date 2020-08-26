import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, Query, Param } from '@nestjs/common';
import { VesselWeatherService } from './vessel-weather.service';
import { VesselWeather } from './schemas/vessel-weather.schema';
import { ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateVesselWeatherDto } from './dto/createVesselWeather.dto';

@Controller('vessel-weather')
export class VesselWeatherController {
    constructor(private vesselWeatherService: VesselWeatherService) {}

    @Get('/:mmsi/:timeStamp')
    @ApiOkResponse({description: 'Returns vessel weather for specified date'})
    @ApiParam({name: 'mmsi', example: '257654700'})
    @ApiParam({name: 'timeStamp', example: (new Date((Date.now() - 86400000)).toISOString())   })
    getVesselWeather(@Param('mmsi') mmsi: string, @Param('timeStamp') timeStamp: string): Promise<VesselWeather> {
        return this.vesselWeatherService.getVesselweather(mmsi, timeStamp  )
    }

    @Get('/:mmsi')
    getVesselWeatherNow(@Param('mmsi') mmsi: string): Promise<any> {
        return Promise.resolve('not implemented')
    }
}

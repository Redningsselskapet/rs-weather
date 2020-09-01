import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, Query, Param } from '@nestjs/common';
import { VesselWeatherService } from './vessel-weather.service';
import { VesselWeather } from './schemas/vessel-weather.schema';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateVesselWeatherDto } from './dto/create-vessel-weather.dto';

@Controller('api')
@ApiTags('Vessel Weather')
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
    @ApiOkResponse({description: 'Returns latest vessel weather'})
    @ApiParam({name: 'mmsi', example: '257654700'})
    getVesselWeatherNow(@Param('mmsi') mmsi: string): Promise<any> {
        return this.vesselWeatherService.getVesselweather(mmsi, new Date().toISOString())
    }
}

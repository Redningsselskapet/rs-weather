import { IsNumber, IsDateString, validate } from "class-validator"
import { Transform, Expose } from "class-transformer"
import { Weather } from "../interfaces/weather.interface"

export class WeatherStormGlassDto implements Weather {
    @IsNumber()
    @Transform(value => value.sg)
    airTemperature: number
    
    @IsNumber()
    @Transform(value => value.sg)
    cloudCover: number
    
    @IsNumber()
    @Transform(value => value.sg)
    precipitation: number

    @IsDateString()
    @Expose({name: 'time'})
    weatherTimeStamp: string
    
    @IsNumber()
    @Transform(value => value.sg)
    visibility: number
    
    @IsNumber()
    @Transform(value => value.sg)
    waterTemperature: number
    
    @IsNumber()
    @Transform(value => value.sg)
    waveHeight: number
    
    @IsNumber()
    @Transform(value => value.sg)
    windDirection: number
    
    @IsNumber()
    @Transform(value => value.sg)
    windSpeed: number
}

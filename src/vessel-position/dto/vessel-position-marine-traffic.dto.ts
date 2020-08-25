import { VesselPosition } from "../interfaces/vessel-position.interface";
import { VesselDataProvider } from "../enums/vessel-data-provider.enum";
import { IsNumberString, IsNumber, IsDateString, IsEnum } from "class-validator";
import { Expose } from "class-transformer";
import { Transform } from 'class-transformer'

export class VesselPositionMarineTrafficDto implements VesselPosition {
    @IsNumberString()
    @Expose({name:'MMSI'})    
    mmsi: string;
    
    @IsNumber()
    @Expose({name: 'LAT'})
    @Transform(value => parseFloat(value))
    lat: number;
    
    @IsNumber()
    @Expose({name: 'LON'})
    @Transform(value => parseFloat(value))
    lng: number;
    
    @IsDateString()
    @Expose({name: 'TIMESTAMP'})
    timeStamp: string;

    @IsEnum(VesselDataProvider)
    @Expose()
    provider: VesselDataProvider.KYSTVERKET
}

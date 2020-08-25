
import { IsNumberString, IsDateString, IsNumber, IsEnum } from 'class-validator'
import { Transform, Expose } from 'class-transformer'
import { VesselPosition } from '../interfaces/vessel-position.interface';
import { VesselDataProvider } from '../enums/vessel-data-provider.enum';

export class VesselPositionKystverketDto implements VesselPosition {

    @IsNumberString()
    @Expose({name:'MMSI'})    
    mmsi: string;
    
    @IsNumber()
    @Expose({name: 'Decimal_Latitude'})
    @Transform(value => parseFloat(value))
    lat: number;
    
    @IsNumber()
    @Expose({name: 'Decimal_Longitude'})
    @Transform(value => parseFloat(value))
    lng: number;
    
    @IsDateString()
    @Expose({name: 'Time_stamp'})
    timeStamp: string;

    @IsEnum(VesselDataProvider)
    @Expose()
    provider: VesselDataProvider.KYSTVERKET
}

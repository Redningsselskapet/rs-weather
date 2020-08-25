import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class VesselWeather extends Document {
  @Prop()
  mmsi: string;

  @Prop()
  lat: number;

  @Prop()
  lng: number;

  @Prop()
  timeStamp: string;

  @Prop()
  airTemperature: number;

  @Prop()
  cloudCover: number;

  @Prop()
  precipitation: number;

  @Prop()
  visibility: number

  @Prop()
  windSpeed: number;

  @Prop()
  windDirection: number;

  @Prop()
  waveHeight: number;

  @Prop()
  waterTemperature: number;

  @Prop()
  weatherTimeStamp: string;
}

export const VesselWeatherSchema = SchemaFactory.createForClass(VesselWeather).index({mmsi: 1, timeStamp: 1}, { unique: true })
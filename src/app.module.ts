import { Module, HttpModule } from '@nestjs/common';
import { VesselPositionModule } from './vessel-position/vessel-position.module';
import { VesselWeatherModule } from './vessel-weather/vessel-weather.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VesselPositionModule,
    VesselWeatherModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useCreateIndex: true,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
    }),
  ],
})
export class AppModule {}

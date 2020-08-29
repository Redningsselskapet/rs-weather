export class CreateVesselWeatherDto {

    mmsi: string;
  
    lat: number;
  
    lng: number;
  
    timeStamp: string;
  
    airTemperature: number;
  
    cloudCover: number;

    visibility: number;
  
    windSpeed: number;
  
    windDirection: number;
  
    waveHeight: number;
  
    waterTemprature: number;
  
    weatherTimeStamp: string;
}
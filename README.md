## Description

RS-Weather is a weather tracker that collects the weather on every rs vessels and makes it searchable.




## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Bernt Anker](bernt.anker@rs.no)



## Response Object field Description

| Field            | Description                                                                   |
|------------------|-------------------------------------------------------------------------------|
| weatherTimeStamp | Forecast hour Timestamp in UTC                                                |
| airTemperature   | Air temperature in degrees celsius                                            |
| cloudCover       | Total cloud coverage in percent                                               |
| precipitation    | Mean precipitation in kg/m²                                                   |
| visibility       | Horizontal visibility in km                                                   |
| waterTemperature | Water temperature in degrees celsius                                          |
| waveHeight       | Significant Height of combined wind and swell waves in meters                 |
| windDirection    | Direction of wind at 10m above sea level. 0° indicates wind coming from north |
| windSpeed        | Speed of wind at 10m above sea level in meters per second.                    |
| mmsi             | Maritime Mobile Service Identity                                              |
| lat              | Latitiude in decimals                                                         |
| lng              | Lonigitude in decimals                                                        |
| timeStamp        | Timestamp in UTC                                                              |
|                  |                                                                               |
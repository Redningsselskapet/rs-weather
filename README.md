## Description

RS-Weather is a weather tracker that collects the weather on every rs vessels and makes it searchable.

## Environment parameters

| Parameter           | Description                   | Default value                    |
|---------------------|-------------------------------|----------------------------------|
| API_KEY             | StormGlass API KEY            |                                  |
| DB_USER             | Database user                 |                                  |
| DB_PASS             | Database password             |                                  |
| MONGO_URI           | MongoDB URI                   |                                  |
| TIME_WINDOW_MINUTES | Find nearest vessel weather position in a search window of a nubmer of minutes | 60                               |
| DATA_STORED_IN_DAYS | How long to store vessel weather data            | 365'                             |
|


## Pushing polling from azure container registry

```bash
# login azure container registry
$ docker login banker.azurecr.io
```

## Spin up application in a kubernetes environment
```bash
# Create kubernetes secrets to pull docker image
$ kubectl create secret docker-registry azurecr-secret --docker-server banker.azurecr.io --docker-username banker --docker-password <PASSWORD>
# set db secret
$ kubectl create secret generic db-secret --from-literal=DB_PASS=<PASSWORD>

# set API_KEY
$ kubectl create secret generic stormglass-secret --from-literal=API_KEY=<API_KEY>

# enable ingress - docker-desktop for windows
$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.35.0/deploy/static/provider/cloud/deploy.yaml

# spin up the application in kubernetes
$ kubectl apply -f infra/k8s

```
## Stay in touch

- Author - [Bernt Anker](bernt.anker@rs.no)

---

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
| lng              | Longitude in decimals                                                        |
| timeStamp        | Timestamp in UTC                                                              |
|                  |                                                                               |
docker_build('banker.azurecr.io/vessel-weather', '.', entrypoint='npm run start:dev', live_update=[sync('.', '/app'), run('npm install', trigger=['./package.json', './package-lock.json'])])
k8s_yaml('infra/k8s/vessel-weather-depl.yaml')
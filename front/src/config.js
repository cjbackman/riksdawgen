let API_URL

switch (process.env.NODE_ENV) {
  case 'development':
    API_URL = 'http://localhost:5000'
    break
  case 'production':
    API_URL = 'http://riksdawgen:8080'
    break
  default:
    API_URL = 'http://localhost:5000'
    break
}

export const Config = {
  API_URL
}

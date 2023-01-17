export class ConfigService {
  get mongoConnection() {
    return 'mongodb://127.0.0.1:27017/test';
  }

  get jwtSecret() {
    return 'SECRET';
  }

  get appPort() {
    return 5000;
  }
}

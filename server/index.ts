import express from 'express';
import { connect } from 'mongoose';

import { authController, authMiddleware } from './auth/index.js';
import { carsController } from './cars/index.js';
import { configService } from './config/index.js';
import { usersController } from './users/index.js';

const app = express();

run().catch((err) => console.error(err));

async function run() {
  app.use(express.json());

  await connect(configService.mongoConnection);
  const checkToken = authMiddleware.checkToken.bind(authMiddleware);

  // TODO: add swagger

  app.get('/cars/:id', checkToken, carsController.findById.bind(carsController));
  app.get('/cars/', checkToken, carsController.findByQuery.bind(carsController));
  app.post('/cars/', checkToken, carsController.create.bind(carsController));
  app.put('/cars/', checkToken, carsController.update.bind(carsController));
  app.delete('/cars/:id', checkToken, carsController.delete.bind(carsController));

  app.get('/users/:id', checkToken, usersController.findById.bind(usersController));
  app.post('/users/', usersController.create.bind(usersController));

  app.post('/singIn/', authController.singIn.bind(authController));

  app.listen(configService.appPort, () => console.log(`Running on port ${configService.appPort}`));
}

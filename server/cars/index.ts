import { CarsController } from './cars.controller.js';
import { CarsService } from './cars.service.js';
import { CarsRepository } from './cars.repository.js';
import { carsModel } from './cars.entity.js';

const carsRepository = new CarsRepository(carsModel);
const carsService = new CarsService(carsRepository);

export const carsController = new CarsController(carsService);

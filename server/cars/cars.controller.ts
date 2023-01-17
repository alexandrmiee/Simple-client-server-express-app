import { Request, Response } from 'express';

import { CarsService } from './cars.service.js';
import { ApiError } from '../api.errors.js';

export class CarsController {
  constructor(private readonly $cars: CarsService) {}

  // GET /cars/:id
  public async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        throw new ApiError('Bad id', 'id should be defined', 500);
      }

      const data = await this.$cars.findCar(id);

      if (!data) {
        throw new ApiError('Car not found', null, 404);
      }
      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }

  // GET /cars/?id=1
  public async findByQuery(req: Request, res: Response) {
    try {
      const data = await this.$cars.findCars(req.query);
      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }

  // POST /cars/
  public async create(req: Request, res: Response) {
    try {
      const data = await this.$cars.createCar(req.body);
      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }

  // PUT /cars/
  public async update(req: Request, res: Response) {
    try {
      const data = await this.$cars.updateCar(req.body);
      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }

  // DELETE /cars/:id
  public async delete(req: Request, res: Response) {
    try {
      const data = await this.$cars.deleteCar(req.params.id);
      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }
}

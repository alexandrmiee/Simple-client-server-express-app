import { Car, CarModel } from './cars.entity.js';
import { CarsRepository } from './cars.repository.js';
import { ApiError } from '../api.errors.js';

export class CarsService {
  constructor(private readonly $cars: CarsRepository) {}

  async findCar(id: string) {
    try {
      const car = await this.$cars.findOne(id);

      return this.transformToResponse(car);
    } catch (e) {
      throw new ApiError(`Car with id ${id} cannot be found`, e.message, 404);
    }
  }

  async findCars(car: Partial<Car>, limit: number = 0) {
    try {
      const cars = await this.$cars.findMany(this.transformFromRequest(car), limit);

      return cars.map(this.transformToResponse);
    } catch (e) {
      throw new ApiError(`Car with id ${car.id} cannot be found`, e.message, 404);
    }
  }

  async createCar(car: Partial<Car>) {
    try {
      const data = await this.$cars.create(this.transformFromRequest(car));

      return this.transformToResponse(data);
    } catch (e) {
      throw new ApiError(`New car cannot be created`, e.message);
    }
  }

  async updateCar(car: Partial<Car>) {
    try {
      const data = await this.$cars.update(this.transformFromRequest(car));

      return this.transformToResponse(data);
    } catch (e) {
      throw new ApiError(`Car with id ${car.id} cannot be updated`, e.message);
    }
  }

  async deleteCar(id: string) {
    try {
      await this.$cars.delate(id);
    } catch (e) {
      throw new ApiError(`Car with id ${id} cannot be deleted`, e.message);
    }
  }

  private transformToResponse(car: CarModel) {
    return {
      id: car._id.toString(),
      brand: car.brand,
      name: car.name,
      price: car.price,
      year: car.year,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
    };
  }

  private transformFromRequest(car: Partial<Car>) {
    return {
      ...(car.id && { id: car.id }),
      ...(car.brand && { brand: car.brand }),
      ...(car.name && { name: car.name }),
      ...(car.price && { price: car.price }),
      ...(car.year && { year: car.year }),
    };
  }
}

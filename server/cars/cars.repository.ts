import { Model, Types } from 'mongoose';

import { Car } from './cars.entity.js';

export class CarsRepository {
  constructor(private readonly $model: Model<Car>) {}

  findOne(id: string) {
    return this.$model.findById(id);
  }

  findMany(car: Partial<Car>) {
    return this.$model.find(this.transformId(car));
  }

  create(car: Omit<Partial<Car>, 'id'>) {
    return this.$model.create(car);
  }

  update(car: Partial<Car>) {
    return this.$model.findOneAndUpdate({ id: car.id }, car, { new: true });
  }

  delate(id: string) {
    return this.$model.findOneAndDelete({ _id: new Types.ObjectId(id) });
  }

  private transformId(car: Partial<Car>) {
    return {
      ...car,
      ...(car.id && { _id: new Types.ObjectId(car.id) }),
    };
  }
}

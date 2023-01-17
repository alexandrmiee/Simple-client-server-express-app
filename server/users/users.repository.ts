import { Model, Types } from 'mongoose';

import { User } from './users.entity.js';

export class UsersRepository {
  constructor(private readonly $model: Model<User>) {}

  findOne(id: string) {
    return this.$model.findById(id);
  }

  findByLogin(login: string) {
    return this.$model.findOne({ login });
  }

  findMany(user: Partial<User>) {
    return this.$model.find(this.transformId(user));
  }

  create(user: Omit<Partial<User>, 'id'>) {
    return this.$model.create(user);
  }

  update(user: Partial<User>) {
    console.log({ user });
    return this.$model.findOneAndUpdate({ id: new Types.ObjectId(user.id) }, user, { new: true, overwrite: true });
  }

  delate(id: string) {
    return this.$model.findOneAndDelete({ _id: new Types.ObjectId(id) });
  }

  private transformId(user: Partial<User>) {
    return {
      ...user,
      ...(user.id && { _id: new Types.ObjectId(user.id) }),
    };
  }
}

import bcrypt from 'bcrypt';

import { ApiError } from '../api.errors.js';
import { User, UserModel } from './users.entity.js';
import { UsersRepository } from './users.repository.js';

export class UsersService {
  constructor(private readonly $users: UsersRepository) {}

  async findUser(id: string) {
    try {
      const user = await this.$users.findOne(id);

      if (!user) {
        throw new ApiError(`User with id ${id} cannot be found`, null, 404);
      }

      return this.transformToResponse(user);
    } catch (e) {
      throw new ApiError(`User with id ${id} cannot be found`, e.message);
    }
  }

  async findUsers(user: Partial<User>) {
    try {
      const users = await this.$users.findMany(this.transformFromRequest(user));

      return users.map(this.transformToResponse);
    } catch (e) {
      throw new ApiError(`User with id ${user.id} cannot be found`, e.message);
    }
  }

  async createUser(user: Partial<User>) {
    try {
      const data = await this.$users.create(this.transformFromRequest(user));

      return this.transformToResponse(data);
    } catch (e) {
      throw new ApiError(`New user cannot be created`, e.message);
    }
  }

  async updateUser(user: Partial<User>) {
    try {
      const data = await this.$users.update(this.transformFromRequest(user));

      if (!data) {
        throw new ApiError(`User cannot be found`, null, 404);
      }

      return this.transformToResponse(data);
    } catch (e) {
      console.log(e.message);
      throw new ApiError(`User with id ${user.id} cannot be updated`, e.message);
    }
  }

  async checkPassword(login: string, password: string) {
    const user = await this.$users.findByLogin(login);

    const compare = await bcrypt.compare(password, user.password);
    return compare;
  }

  private transformToResponse(user: UserModel) {
    return {
      id: user._id.toString(),
      login: user.login,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    };
  }

  private transformFromRequest(user: Partial<User>) {
    return {
      ...(user.id && { id: user.id }),
      ...(user.login && { login: user.login }),
      ...(user.password && { password: user.password }),
      ...(user.accessToken && { accessToken: user.accessToken }),
      ...(user.refreshToken && { refreshToken: user.refreshToken }),
    };
  }
}

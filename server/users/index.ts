import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UsersRepository } from './users.repository.js';
import { usersModel } from './users.entity.js';

const usersRepository = new UsersRepository(usersModel);
export const usersService = new UsersService(usersRepository);

export const usersController = new UsersController(usersService);

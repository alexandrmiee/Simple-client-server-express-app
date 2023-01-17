import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { configService } from '../config/index.js';
import { usersService } from '../users/index.js';
import { AuthMiddleware } from './auth.middleware.js';

export const authService = new AuthService(usersService, configService);

export const authController = new AuthController(authService);

export const authMiddleware = new AuthMiddleware(authService);

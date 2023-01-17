import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../api.errors.js';
import { AuthService } from './auth.service.js';

export class AuthMiddleware {
  constructor(private readonly $auth: AuthService) {}

  async checkToken(req: Request, res: Response, next: NextFunction) {
    const error = new ApiError('Auth error', 'Invalid token', 403);

    try {
      const { authorization } = req.headers;

      const token = authorization.substring(7);
      const isTokenValid = await this.$auth.checkToken(token);

      if (isTokenValid) {
        next();
      } else {
        res.status(403);
        res.send(error);
        // next(error);
      }
    } catch (e) {
      res.status(403);
      res.send(error);
      // next(error);
    }
  }
}

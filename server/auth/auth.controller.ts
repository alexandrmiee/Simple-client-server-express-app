import { Request, Response } from 'express';

import { AuthService } from './auth.service.js';

export class AuthController {
  constructor(private readonly $auth: AuthService) {}

  // POST /singIn/
  async singIn(req: Request, res: Response) {
    try {
      const { login, password } = req.body;
      const data = await this.$auth.singIn(login, password);

      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }

  // TODO: refresh token
}

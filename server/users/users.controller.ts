import { Request, Response } from 'express';
import { UsersService } from './users.service.js';

export class UsersController {
  constructor(private readonly $users: UsersService) {}

  // GET /users/:id
  public async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.$users.findUser(id);
      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }

  // POST /users/
  public async create(req: Request, res: Response) {
    try {
      const data = await this.$users.createUser(req.body);
      res.send(data);
    } catch (e) {
      res.status(e.status ?? 500);
      res.send(e);
    }
  }
}

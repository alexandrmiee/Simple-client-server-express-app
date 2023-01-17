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
      res.status(500);
      res.send(e);
    }
  }

  // GET /users/?id=1
  public async findByQuery(req: Request, res: Response) {
    try {
      console.log({ query: req.query });
      const data = await this.$users.findUsers(req.query);
      res.send(data);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  }

  // POST /users/
  public async create(req: Request, res: Response) {
    try {
      const data = await this.$users.createUser(req.body);
      res.send(data);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  }

  // PUT /users/
  public async update(req: Request, res: Response) {
    try {
      const data = await this.$users.updateUser(req.body);
      res.send(data);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  }

  // DELETE /users/:id
  public async delete(req: Request, res: Response) {
    try {
      const data = await this.$users.deleteUser(req.params.id);
      res.send(data);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  }
}

import jwt from 'jsonwebtoken';

import { ApiError } from '../api.errors.js';
import { UsersService } from '../users/users.service.js';
import { ConfigService } from '../config/config.service.js';

interface Token {
  id: string;
  type: 'user';
}

export class AuthService {
  constructor(private readonly $users: UsersService, private readonly $config: ConfigService) {}

  async signIn(login: string, password: string) {
    try {
      const [user] = await this.$users.findUsers({ login });

      const isPasswordValid = await this.$users.checkPassword(login, password);
      if (!isPasswordValid || !user) {
        throw new ApiError('Auth error', 'Invalid credentials', 403);
      }

      const tokens = {
        accessToken: jwt.sign({ id: user.id, type: 'user' }, this.$config.jwtSecret, { expiresIn: '2h' }),
        refreshToken: jwt.sign({ id: user.id, type: 'user' }, this.$config.jwtSecret, { expiresIn: '10h' }),
      };

      return await this.$users.updateUser({
        ...user,
        ...tokens,
      });
    } catch (e) {
      throw new ApiError('Auth error', e.message, 403);
    }
  }

  async checkToken(token: string) {
    try {
      const { id, type } = jwt.verify(token, this.$config.jwtSecret) as Token;
      const user = this.$users.findUser(id);

      if (type === 'user' && user) {
        return true;
      }

      throw new ApiError('Auth error', 'Invalid token', 403);
    } catch (e) {
      throw new ApiError('Auth error', e.message, 403);
    }
  }
}

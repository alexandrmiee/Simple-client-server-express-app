import { AuthService } from './auth.service.js';
import jwt from 'jsonwebtoken';

// TODO: mock types
const userServiceMock = {
  findUser: () => jest.fn(),
  findUsers: () => jest.fn(),
  checkPassword: () => jest.fn(),
  updateUser: () => jest.fn(),
};

const configServiceMock = {
  jwtSecret: 'SECRET',
};

const setupService = (usersMock: any = userServiceMock) => {
  return new AuthService(usersMock, configServiceMock as any);
};

describe('AuthService', () => {
  describe('token verification', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should verify token', async () => {
      const service = setupService();
      const verifySpy = jest.spyOn(jwt, 'verify').mockReturnValueOnce({ id: 'id', type: 'user' } as any);
      const findUserSpy = jest.spyOn(userServiceMock, 'findUser').mockReturnValueOnce({ id: 'id' } as any);

      const result = await service.checkToken('token');
      expect(result).toEqual(true);
      expect(verifySpy).toBeCalledTimes(1);
      expect(findUserSpy).toBeCalledTimes(1);
    });

    it('should trow verify token error', async () => {
      const service = setupService();
      const verifySpy = jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error('invalid token');
      });
      const findUserSpy = jest.spyOn(userServiceMock, 'findUser');

      const checkToken = async () => service.checkToken('token');
      await expect(checkToken()).rejects.toThrow('Auth error');
      expect(verifySpy).toBeCalledTimes(1);
      expect(findUserSpy).toBeCalledTimes(0);
    });

    it('should trow user error', async () => {
      const service = setupService();
      const verifySpy = jest.spyOn(jwt, 'verify').mockReturnValueOnce({ id: 'id', type: 'user' } as any);
      const findUserSpy = jest.spyOn(userServiceMock, 'findUser').mockImplementationOnce(() => {
        throw new Error('invalid token');
      });

      const checkToken = async () => service.checkToken('token');
      await expect(checkToken()).rejects.toThrow('Auth error');
      expect(verifySpy).toBeCalledTimes(1);
      expect(findUserSpy).toBeCalledTimes(1);
    });
  });

  describe('user sign in', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should sign in user', async () => {
      const service = setupService();
      const signSpy = jest
        .spyOn(jwt, 'sign')
        .mockReturnValueOnce('accessToken' as any)
        .mockReturnValueOnce('refreshToken' as any);
      const findUsersSpy = jest.spyOn(userServiceMock, 'findUsers').mockReturnValueOnce([{ id: 'id' }] as any);
      const updateUserSpy = jest.spyOn(userServiceMock, 'updateUser').mockReturnValueOnce({ id: 'id' } as any);
      const checkPasswordSpy = jest.spyOn(userServiceMock, 'checkPassword').mockReturnValueOnce(true as any);

      const result = await service.signIn('login', 'password');
      expect(result).toEqual({ id: 'id' });
      expect(signSpy).toBeCalledTimes(2);
      expect(findUsersSpy).toBeCalledTimes(1);
      expect(updateUserSpy).toBeCalledWith({ id: 'id', accessToken: 'accessToken', refreshToken: 'refreshToken' });
      expect(checkPasswordSpy).toBeCalledTimes(1);
    });

    it('should throw user error', async () => {
      const service = setupService();
      const signSpy = jest
        .spyOn(jwt, 'sign')
        .mockReturnValueOnce('accessToken' as any)
        .mockReturnValueOnce('refreshToken' as any);
      const findUsersSpy = jest.spyOn(userServiceMock, 'findUsers').mockImplementationOnce(() => {
        throw new Error('invalid token');
      });
      const updateUserSpy = jest.spyOn(userServiceMock, 'updateUser').mockReturnValueOnce({ id: 'id' } as any);
      const checkPasswordSpy = jest.spyOn(userServiceMock, 'checkPassword').mockReturnValueOnce(true as any);

      const signIn = async () => service.signIn('login', 'password');
      await expect(signIn()).rejects.toThrow('Auth error');

      expect(findUsersSpy).toBeCalledTimes(1);
      expect(signSpy).toBeCalledTimes(0);
      expect(updateUserSpy).toBeCalledTimes(0);
      expect(checkPasswordSpy).toBeCalledTimes(0);
    });

    it('should throw password error', async () => {
      const service = setupService();
      const signSpy = jest
        .spyOn(jwt, 'sign')
        .mockReturnValueOnce('accessToken' as any)
        .mockReturnValueOnce('refreshToken' as any);
      const findUsersSpy = jest.spyOn(userServiceMock, 'findUsers').mockReturnValueOnce([{ id: 'id' }] as any);
      const updateUserSpy = jest.spyOn(userServiceMock, 'updateUser').mockReturnValueOnce({ id: 'id' } as any);
      const checkPasswordSpy = jest.spyOn(userServiceMock, 'checkPassword').mockReturnValueOnce(false as any);

      const signIn = async () => service.signIn('login', 'password');
      await expect(signIn()).rejects.toThrow('Auth error');

      expect(findUsersSpy).toBeCalledTimes(1);
      expect(signSpy).toBeCalledTimes(0);
      expect(updateUserSpy).toBeCalledTimes(0);
      expect(checkPasswordSpy).toBeCalledTimes(1);
    });
  });
});

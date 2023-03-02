import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the users service
    fakeUsersService = {
      findAllByEmail: () => Promise.resolve([]),
      // Create a fake user for unit testing
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@test.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    fakeUsersService.findAllByEmail = () =>
      Promise.resolve([
        { id: 1, email: 'test@test.com', password: 'test' } as User,
      ]);

    await expect(service.signup('test@test.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('throws an error if signin is called with an unused email', async () => {
    await expect(service.signin('test@test.com', 'test')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('throws an error if an invalid password is provided', async () => {
    fakeUsersService.findAllByEmail = () =>
      Promise.resolve([{ email: 'test@test.com', password: 'test' } as User]);

    await expect(service.signin('test@test.com', 'test')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('return a user if correct password is provided', async () => {
    fakeUsersService.findAllByEmail = () =>
      Promise.resolve([
        {
          email: 'test@test.com',
          password:
            '6e74a94936803e1b.60126d23d708455eb3353f3dc9eb8b6c61aab1bf1549fdf365f5416a162b7f6e',
        } as User,
      ]);

    const user = await service.signin('test@test.com', 'test');
    expect(user).toBeDefined();

    // const user = await service.signup('test@test.com', 'test');
    // console.log(user);
  });
});

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

// Convert scrypt to a promise-based function
// promisify() is a built-in function to return a promise
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // Sign up a user with the given email and password
  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.findAllByEmail(email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Hash user's password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');

    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');

    // Create a new user and save it to the database
    const user = await this.usersService.create(email, result);

    // Return that user
    return user;
  }

  // Sign in a user with the given email and password
  async signin(email: string, password: string) {
    const [user] = await this.usersService.findAllByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}

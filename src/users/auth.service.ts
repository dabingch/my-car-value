import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const users = await this.usersService.findAllByEmail(email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // Hash user's password
    // Create a new user and save it to the database
    // Return that user
  }

  signin() {}
}

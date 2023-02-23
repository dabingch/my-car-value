import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.email, body.password);
  }

  // Turn an instance of User into a plain object based on some rules
  @UseInterceptors(SerializeInterceptor)
  @Get(':id')
  async findUser(@Param('id') id: string) {
    console.log('handler is running');
    const user = await this.usersService.findOneById(parseInt(id));

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    const users = await this.usersService.findAllByEmail(email);
    console.log(users);

    if (!users.length) {
      throw new NotFoundException(`User not found`);
    }

    return users;
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}

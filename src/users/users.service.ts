import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // Private does not need to Initialize instance
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  findOneById(id: number) {
    return this.repo.findOneBy({ id });
  }

  findAllByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }

  // Partial<User> is a type that represents all of the properties of User,
  // but makes them all optional.
  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Object.assign() is a built-in function
    // that copies the properties of one object
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOneById(id);
    if (!user) {
      throw new Error('User not found');
    }

    // remove(entity) will call AfterRemove() hook
    return this.repo.remove(user);
  }
}

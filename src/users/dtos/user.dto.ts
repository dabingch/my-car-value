import { Expose } from 'class-transformer';

// Return only the id and email fields from the user instance
export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;
}

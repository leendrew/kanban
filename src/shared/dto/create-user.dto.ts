import { IsNotEmpty, MinLength } from 'class-validator';
import type { CreateUserPayload } from '../../api/user/user.types';

export class CreateUserDto implements CreateUserPayload {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @MinLength(3)
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

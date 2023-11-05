import { IsNotEmpty, MinLength } from 'class-validator';
import type { CreateUserPayload } from '../user.types';
import {
  MIN_PASSWORD_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '../../../shared/constants';

export class CreateUserDto implements CreateUserPayload {
  @IsNotEmpty()
  @MinLength(MIN_USER_NAME_LENGTH)
  name: string;

  @IsNotEmpty()
  @MinLength(MIN_LOGIN_LENGTH)
  login: string;

  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;
}

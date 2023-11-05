import { IsNotEmpty, MinLength } from 'class-validator';
import type { LoginPayload } from '../auth.types';
import { MIN_PASSWORD_LENGTH, MIN_LOGIN_LENGTH } from '../../../shared';

export class LoginDto implements LoginPayload {
  @IsNotEmpty()
  @MinLength(MIN_LOGIN_LENGTH)
  login: string;

  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  password: string;
}

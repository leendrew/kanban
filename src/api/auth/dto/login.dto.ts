import { IsNotEmpty, MinLength } from 'class-validator';
import type { LoginPayload } from '../auth.types';

export class LoginDto implements LoginPayload {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

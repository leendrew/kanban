import { IsOptional, MinLength } from 'class-validator';
import type { UpdateUserPayload } from '../user.types';
import {
  MIN_PASSWORD_LENGTH,
  MIN_LOGIN_LENGTH,
  MIN_USER_NAME_LENGTH,
} from '../../../shared/constants';

export class UpdateUserDto implements UpdateUserPayload {
  @IsOptional()
  @MinLength(MIN_USER_NAME_LENGTH)
  name?: string;

  @IsOptional()
  @MinLength(MIN_LOGIN_LENGTH)
  login?: string;

  @IsOptional()
  @MinLength(MIN_PASSWORD_LENGTH)
  password?: string;
}

import { IsNotEmpty, MinLength } from 'class-validator';
import { MIN_PASSWORD_LENGTH } from '../../../shared/constants';
import { CreateUserDto } from '../../user/dto';
import type { RegisterPayload } from '../auth.types';

export class RegisterDto extends CreateUserDto implements RegisterPayload {
  @IsNotEmpty()
  @MinLength(MIN_PASSWORD_LENGTH)
  confirmPassword: string;
}

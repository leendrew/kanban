import { IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @MinLength(3)
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

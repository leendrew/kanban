import { IsOptional } from 'class-validator';
import { GetUserPayload } from '../user.types';

export class GetUserDto implements GetUserPayload {
  @IsOptional()
  login?: string;
}

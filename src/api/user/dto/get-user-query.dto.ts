import { IsOptional } from 'class-validator';
import { GetUserQuery } from '../user.types';

export class GetUserQueryDto implements GetUserQuery {
  @IsOptional()
  login?: string;
}

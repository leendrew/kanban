import { IsNotEmpty } from 'class-validator';
import type { RefreshPayload } from '../auth.types';
import type { Token } from '../jwt';

export class RefreshDto implements RefreshPayload {
  @IsNotEmpty()
  refreshToken: Token;
}

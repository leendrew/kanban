import { IsNotEmpty } from 'class-validator';
import type { CreateBoardPayload } from '../board.types';

export class CreateBoardDto implements CreateBoardPayload {
  @IsNotEmpty()
  name: string;
}

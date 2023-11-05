import { Entity, Column, ManyToOne } from 'typeorm';
import { EntityBase } from '../../common';
import { Board } from '../board/board.entity';

@Entity('tasks')
export class Task extends EntityBase {
  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ name: 'is_completed', type: 'boolean', nullable: false, default: false })
  isCompleted: boolean;

  @ManyToOne(() => Board, (b) => b.id, { cascade: ['update', 'remove'] })
  board: Board;
}

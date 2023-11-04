import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../../common';

@Entity('tasks')
export class Task extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'is_completed', type: 'boolean', nullable: false, default: false })
  isCompleted: boolean;
}

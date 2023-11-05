import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { EntityBase } from '../../common';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';

@Entity('boards')
export class Board extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => User, (u) => u.id, { cascade: ['update', 'remove'] })
  user: User;

  @OneToMany(() => Task, (t) => t.id)
  tasks: Task[];
}

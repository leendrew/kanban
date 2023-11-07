import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { EntityBase } from '../../common';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';

@Entity('boards')
export class Board extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'smallint', nullable: false })
  index: number;

  @ManyToOne(() => User, (u) => u.boards, { cascade: ['update', 'remove'] })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Task, (t) => t.board, { eager: true })
  tasks: Task[];
}

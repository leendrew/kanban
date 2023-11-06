import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { EntityBase } from '../../common';
import { User } from '../user/user.entity';
import { Task } from '../task/task.entity';

@Entity('boards')
export class Board extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @ManyToOne(() => User, (u) => u.boards, { cascade: ['update', 'remove'], eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Task, (t) => t.board)
  tasks: Task[];
}

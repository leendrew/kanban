import { Entity, Column, OneToMany } from 'typeorm';
import { EntityBase } from '../../common';
import { Board } from '../board/board.entity';

@Entity('users')
export class User extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  login: string;

  @Column({ type: 'text', nullable: false, select: false })
  password: string;

  @OneToMany(() => Board, (b) => b.user)
  boards: Board[];
}

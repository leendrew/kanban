import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../../common';

@Entity('users')
export class User extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  login: string;

  @Column({ type: 'text', nullable: false })
  password: string;
}

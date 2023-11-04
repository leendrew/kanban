import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../../common';

@Entity('boards')
export class Board extends EntityBase {
  @Column({ type: 'varchar', nullable: false })
  name: string;
}

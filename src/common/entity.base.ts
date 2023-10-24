import { PrimaryGeneratedColumn, Column } from 'typeorm';

export abstract class EntityBase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz', name: 'created_at', default: () => 'now()' })
  createdAt: Date;

  @Column({ type: 'timestamptz', name: 'updated_at', default: () => 'now()', onUpdate: 'now()' })
  updatedAt: Date;
}

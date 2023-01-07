import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// redo for better
@Entity()
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', unique: true, length: 50 })
  public email!: string;

  @Column({ type: 'varchar', length: 50 })
  public fullName!: string;

  @Column({ type: 'varchar', length: 50 })
  public nationalId!: string;

  @Column('enum', {
    name: 'gender',
    nullable: true,
    enum: ['M', 'F'],
    default: 'M',
  })
  public gender!: 'M' | 'F' | null;

  @Exclude()
  @Column({ type: 'varchar', length: 100 })
  public password!: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
  deletedAt: Date | null;
}

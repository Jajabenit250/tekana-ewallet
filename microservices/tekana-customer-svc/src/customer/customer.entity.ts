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

    @Column({ type: 'varchar', unique: true })
    public email!: string;

    @Column({ type: 'varchar' })
    public fullName: string;

    @Column({ type: 'varchar' })
    public dateOfbirth: string;

    @Column({ type: 'varchar' })
    public gender: string;

    @Exclude()
    @Column({ type: 'varchar' })
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

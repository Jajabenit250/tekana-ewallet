import { Exclude } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// redo for better 
@Entity()
export class Customer extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar' })
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
}

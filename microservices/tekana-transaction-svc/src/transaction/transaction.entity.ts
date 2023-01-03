import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    public amount!: number;

    @Column('enum', {
        name: 'status',
        nullable: true,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending',
    })
    public status!: 'pending' | 'completed' | 'failed' | null;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    /*
     * Relation Indexs
     */

    @Column({ type: 'varchar' })
    public senderAcc!: string;

    @Column({ type: 'varchar' })
    public receiverAcc!: string;
}

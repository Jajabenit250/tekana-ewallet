import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity()
export class WalletActivityLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    /*
     * Relation IDs
     */

    @Column({ type: 'integer' })
    public transactionId!: number;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    public amount!: number | null;

    @Column('enum', {
        name: 'action',
        nullable: true,
        enum: ['debit', 'credit']
    })
    public action!: 'debit' | 'credit' | null;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    /*
     * Many-To-One Relationships
     */

    @ManyToOne(() => Wallet, (wallet) => wallet.walletActivityLogs)
    public wallet: Wallet;
}

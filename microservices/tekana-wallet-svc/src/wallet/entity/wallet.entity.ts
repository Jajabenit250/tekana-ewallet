import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { WalletActivityLog } from './wallet-activity-log.entity';

@Entity()
export class Wallet extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    // acc number index
    @Column({ type: 'varchar', unique: true })
    public accNumber!: string;

    @Column('enum', {
        name: 'walletType',
        nullable: true,
        enum: ['saving', 'personal', 'loan'],
        default: 'personal',
    })
    public walletType!: 'saving' | 'personal' | 'loan' | null;

    @Column({ type: 'decimal', precision: 12, scale: 2 })
    public balance!: number;

    @Column()
    @CreateDateColumn()
    created_at: Date;

    @Column()
    @UpdateDateColumn()
    updated_at: Date;

    @Column('timestamp with time zone', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    /*
     * Relation IDs
     */

    @Column({ type: 'integer' })
    public customerId!: number;

    /*
     * One-To-Many Relationships
     */

    @OneToMany(
        () => WalletActivityLog,
        (walletActivityLog) => walletActivityLog.wallet,
    )
    public walletActivityLogs: WalletActivityLog[];
}

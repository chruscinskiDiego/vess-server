import { UserConfig } from 'src/user_config/entities/user_config.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Avaliation {

    @PrimaryGeneratedColumn()
    id_avaliation: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    description: string;

    @Column({ type: 'text', nullable: false })
    management_decision: string;

    @Column({ type: 'text', nullable: false })
    summary: string;

    @Column({ type: 'text', nullable: false })
    infos: string;

    @Column({type: 'timestamp', nullable: false})
    created_at: Date;

    @ManyToOne(() => UserConfig )
    @JoinColumn({ name: 'fk_user_id' })
    fk_id_user: UserConfig;
    
}

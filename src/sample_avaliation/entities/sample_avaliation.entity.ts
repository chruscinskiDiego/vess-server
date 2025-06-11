import { Avaliation } from 'src/avaliation/entities/avaliation.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SampleAvaliation {

    @PrimaryGeneratedColumn()
    id_sample: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'int', nullable: false })
    num_layers: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
    score: number;

    @ManyToOne(() => Avaliation)
    @JoinColumn({ name: 'fk_id_avaliation' })
    fk_id_avaliation?: Avaliation;

}

import { SampleAvaliation } from 'src/sample_avaliation/entities/sample_avaliation.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SampleLayer {

    @PrimaryGeneratedColumn()
    id_layer: number;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    length: number;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    note: number;

    @ManyToOne(() => SampleAvaliation)
    @JoinColumn({ name: 'fk_id_sample' })
    fk_id_sample: SampleAvaliation;
}

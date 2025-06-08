import { SampleAvaliation } from 'src/sample_avaliation/entities/sample_avaliation.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SampleLocation {

    @PrimaryGeneratedColumn()
    id_location: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    latitude: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    longitude: string;

    @OneToOne(() => SampleAvaliation, {eager: false})
    @JoinColumn({ name: 'fk_id_sample' })
    fk_id_sample: SampleAvaliation;
    
}

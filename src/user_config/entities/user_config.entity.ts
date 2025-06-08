import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class UserConfig {

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: false, select: false })
    password: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    country: string;

    @Column({ type: 'varchar', length: 255, nullable: false})
    address: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    language: string;

    @Column({ type: 'boolean', default: true, select: false })
    isActive: boolean;

}

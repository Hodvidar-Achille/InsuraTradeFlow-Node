import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class InsurancePolicyDao {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({type: 'varchar'})
    status: string;  // stored as string in DB

    @Column({type: 'date', name: 'start_date'})
    startDate: Date;

    @Column({type: 'date', name: 'end_date'})
    endDate: Date;

    @CreateDateColumn({type: 'timestamp', name: 'creation_date_time'})
    creationDateTime?: Date;

    @UpdateDateColumn({type: 'timestamp', name: 'update_date_time'})
    updateDateTime?: Date;
}
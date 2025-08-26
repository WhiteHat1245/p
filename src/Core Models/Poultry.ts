import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Coop } from './Coop';
import { Breed } from './Breed';
import { HealthLog } from './HealthLog';

@Entity()
export class Poultry {
  @PrimaryGeneratedColumn()
  PoultryID: number;

  @Column({ length: 50 })
  Breed: string;

  @Column({ type: 'date', nullable: true })
  HatchDate: Date | null;

  @Column({ nullable: true })
  BreedID: number | null;

  @ManyToOne(() => Coop, (coop) => coop.Poultries)
  Coop: Coop;

  @ManyToOne(() => Breed, (breed) => breed.Poultries)
  BreedRelation: Breed;

  @OneToMany(() => HealthLog, (healthLog: HealthLog) => healthLog.Poultry)
  HealthLogs: HealthLog[];
}



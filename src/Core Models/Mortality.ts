// في ملف: src/mortality/mortality.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Coop } from './Coop';

@Entity()
export class Mortality {
  @PrimaryGeneratedColumn()
  MortalityID: number;

  @Column()
  CoopID: number;

  @Column({ type: 'date' })
  MortalityDate: Date;

  @Column()
  NumberOfBirds: number;

  @Column({ length: 255, nullable: true })
  Cause: string;

  @ManyToOne(() => Coop, (coop) => coop.Mortalities)
  Coop: Coop;
}
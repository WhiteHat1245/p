// في ملف: src/Core Models/PoultryBatch.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Slaughterhouse } from './slaughterhouse';

@Entity()
export class PoultryBatch {
  @PrimaryGeneratedColumn()
  BatchID: number;

  @Column()
  BatchName: string;

  // other properties...

  @ManyToOne(() => Slaughterhouse, (slaughterhouse) => slaughterhouse.PoultryBatches)
  Slaughterhouse: Slaughterhouse;
}
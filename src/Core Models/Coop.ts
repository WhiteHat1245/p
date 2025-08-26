import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Farm } from './Farm';
import { Poultry } from './Poultry';
import { EggProduction } from './EggProduction';
import { Mortality } from './Mortality';
import { TreatmentSchedule } from './TreatmentSchedule';
import { PoultryBatch } from './PoultryBatch';

@Entity()
export class Coop {
  @PrimaryGeneratedColumn()
  CoopID: number;

  @Column({ length: 50 })
  CoopName: string;

  @Column()
  Capacity: number;

  @Column({ nullable: true })
  FarmID: number | null;

  // الخصائص الملاحية
  @ManyToOne(() => Farm, (farm) => farm.Coops)
  Farm: Farm;

  @OneToMany(() => Poultry, (poultry: Poultry) => poultry.Coop)
  Poultries: Poultry[];

  @OneToMany(() => EggProduction, (eggProduction: EggProduction) => eggProduction.Coop)
  EggProductions: EggProduction[];

  @OneToMany(() => Mortality, (mortality: Mortality) => mortality.Coop)
  Mortalities: Mortality[];

  @OneToMany(() => TreatmentSchedule, (treatmentSchedule: TreatmentSchedule) => treatmentSchedule.Coop)
  TreatmentSchedules: TreatmentSchedule[];

  @OneToMany(() => PoultryBatch, (poultryBatch: PoultryBatch) => poultryBatch.Coop)
  PoultryBatches: PoultryBatch[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Coop } from './Coop';

@Entity()
export class Farm {
  @PrimaryGeneratedColumn()
  FarmID: number;

  @Column({ length: 100 })
  FarmName: string;

  @Column({ length: 255, nullable: true })
  Address: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  EstablishedDate: Date;

  // الخصائص الملاحية
  @OneToMany(() => Coop, (coop: Coop) => coop.Farm)
  Coops: Coop[];
}
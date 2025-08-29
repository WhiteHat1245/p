import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Vaccine {
  @PrimaryGeneratedColumn()
  VaccineID: number;

  @Column({ length: 100 })
  vaccineName: string;

  @Column({ length: 100, nullable: true })
  manufacturer: string;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;
}
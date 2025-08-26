import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FeedConsumption } from './FeedConsumption.js';

@Entity()
export class Feed {
  @PrimaryGeneratedColumn()
  FeedID: number;

  @Column({ length: 100 })
  FeedName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  QuantityInStock: number;

  @Column({ length: 50 })
  Unit: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  UnitPrice: number | null;

  // الخصائص الملاحية
  @OneToMany(() => FeedConsumption, (consumption: FeedConsumption) => consumption.Feed)
  FeedConsumptions: FeedConsumption[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Feed } from './Feed';
import { Poultry } from './Poultry';

@Entity()
export class FeedConsumption {
  @PrimaryGeneratedColumn()
  FeedConsumptionID: number;

  @Column({ type: 'date' })
  ConsumptionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Quantity: number;

  @ManyToOne(() => Feed, (feed) => feed.FeedConsumptions)
  Feed: Feed;

  @ManyToOne(() => Poultry, (poultry) => poultry.Coop)
  Poultry: Poultry;
}



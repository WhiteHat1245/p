
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PoultryBatch } from './PoultryBatch';

@Entity()
export class PerformanceMetric {
  @PrimaryGeneratedColumn()
  MetricID: number;

 @ManyToOne(() => PoultryBatch)
  Batch: PoultryBatch;

  @Column()
  Date: Date;

  @Column({ length: 100 })
  MetricName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  Value: number;
}

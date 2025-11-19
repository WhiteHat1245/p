
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceMetricController } from './performance-metric.controller';
import { PerformanceMetricCommandHandlers } from './commands';
import { PerformanceMetricQueryHandlers } from './queries';
import { PerformanceMetric } from '../Core Models/PerformanceMetric';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PerformanceMetric]),
  ],
  controllers: [PerformanceMetricController],
  providers: [
    ...PerformanceMetricCommandHandlers,
    ...PerformanceMetricQueryHandlers,
  ],
})
export class PerformanceMetricModule {}

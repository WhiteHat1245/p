
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PerformanceMetric } from '../../Core Models/PerformanceMetric';
import { Repository } from 'typeorm';

// Get All Query and Handler
export class GetAllPerformanceMetricsQuery {}

@QueryHandler(GetAllPerformanceMetricsQuery)
export class GetAllPerformanceMetricsQueryHandler implements IQueryHandler<GetAllPerformanceMetricsQuery> {
  constructor(
    @InjectRepository(PerformanceMetric)
    private readonly performanceMetricRepository: Repository<PerformanceMetric>,
  ) {}

  async execute(query: GetAllPerformanceMetricsQuery): Promise<PerformanceMetric[]> {
    return this.performanceMetricRepository.find();
  }
}

// Get By ID Query and Handler
export class GetPerformanceMetricByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetPerformanceMetricByIdQuery)
export class GetPerformanceMetricByIdQueryHandler implements IQueryHandler<GetPerformanceMetricByIdQuery> {
  constructor(
    @InjectRepository(PerformanceMetric)
    private readonly performanceMetricRepository: Repository<PerformanceMetric>,
  ) {}

  async execute(query: GetPerformanceMetricByIdQuery): Promise<PerformanceMetric | null> {
    return this.performanceMetricRepository.findOneBy({ MetricID: query.id });
  }
}

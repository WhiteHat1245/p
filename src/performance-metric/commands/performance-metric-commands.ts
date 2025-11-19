
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePerformanceMetricDto } from '../dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from '../dto/update-performance-metric.dto';
import { PerformanceMetric } from '../../Core Models/PerformanceMetric';

// Create Command and Handler
export class CreatePerformanceMetricCommand {
  constructor(public readonly createPerformanceMetricDto: CreatePerformanceMetricDto) {}
}

@CommandHandler(CreatePerformanceMetricCommand)
export class CreatePerformanceMetricHandler implements ICommandHandler<CreatePerformanceMetricCommand> {
  constructor(
    @InjectRepository(PerformanceMetric)
    private readonly performanceMetricRepository: Repository<PerformanceMetric>,
  ) {}

  async execute(command: CreatePerformanceMetricCommand): Promise<PerformanceMetric> {
    const performanceMetric = this.performanceMetricRepository.create(command.createPerformanceMetricDto);
    return this.performanceMetricRepository.save(performanceMetric);
  }
}

// Update Command and Handler
export class UpdatePerformanceMetricCommand {
  constructor(
    public readonly id: number,
    public readonly updatePerformanceMetricDto: UpdatePerformanceMetricDto,
  ) {}
}

@CommandHandler(UpdatePerformanceMetricCommand)
export class UpdatePerformanceMetricHandler implements ICommandHandler<UpdatePerformanceMetricCommand> {
  constructor(
    @InjectRepository(PerformanceMetric)
    private readonly performanceMetricRepository: Repository<PerformanceMetric>,
  ) {}

  async execute(command: UpdatePerformanceMetricCommand): Promise<PerformanceMetric> {
    await this.performanceMetricRepository.update(command.id, command.updatePerformanceMetricDto);
    const updatedPerformanceMetric = await this.performanceMetricRepository.findOneBy({ MetricID: command.id });
    if (!updatedPerformanceMetric) {
      throw new Error(`PerformanceMetric with ID ${command.id} not found after update.`);
    }
    return updatedPerformanceMetric;
  }
}

// Delete Command and Handler
export class DeletePerformanceMetricCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeletePerformanceMetricCommand)
export class DeletePerformanceMetricHandler implements ICommandHandler<DeletePerformanceMetricCommand> {
  constructor(
    @InjectRepository(PerformanceMetric)
    private readonly performanceMetricRepository: Repository<PerformanceMetric>,
  ) {}

  async execute(command: DeletePerformanceMetricCommand): Promise<void> {
    await this.performanceMetricRepository.delete(command.id);
  }
}

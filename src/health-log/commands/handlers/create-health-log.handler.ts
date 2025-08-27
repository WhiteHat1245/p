// src/health-log/commands/handlers/create-health-log.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHealthLogCommand } from '../impl/create-health-log.command';
import { HealthLog } from 'src/Core Models/HealthLog';

@CommandHandler(CreateHealthLogCommand)
export class CreateHealthLogHandler implements ICommandHandler<CreateHealthLogCommand> {
  constructor(
    @InjectRepository(HealthLog)
    private readonly healthLogRepository: Repository<HealthLog>,
  ) {}

  async execute(command: CreateHealthLogCommand): Promise<HealthLog> {
    const { createHealthLogDto } = command;
    const healthLog = this.healthLogRepository.create(createHealthLogDto as Partial<HealthLog>);
    return this.healthLogRepository.save(healthLog);
  }
}
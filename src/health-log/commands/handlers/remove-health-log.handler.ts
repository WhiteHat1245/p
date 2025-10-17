// src/health-log/commands/handlers/remove-health-log.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveHealthLogCommand } from '../impl/remove-health-log.command';
import { HealthLog } from 'src/Core Models/HealthLog';

@CommandHandler(RemoveHealthLogCommand)
export class RemoveHealthLogHandler
  implements ICommandHandler<RemoveHealthLogCommand>
{
  constructor(
    @InjectRepository(HealthLog)
    private readonly healthLogRepository: Repository<HealthLog>,
  ) {}

  async execute(command: RemoveHealthLogCommand): Promise<void> {
    const { id } = command;
    const result = await this.healthLogRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`HealthLog with ID ${id} not found`);
    }
  }
}

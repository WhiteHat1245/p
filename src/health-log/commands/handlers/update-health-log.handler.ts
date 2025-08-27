// src/health-log/commands/handlers/update-health-log.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateHealthLogCommand } from '../impl/update-health-log.command';
import { HealthLog } from 'src/Core Models/HealthLog';


@CommandHandler(UpdateHealthLogCommand)
export class UpdateHealthLogHandler implements ICommandHandler<UpdateHealthLogCommand> {
  constructor(
    @InjectRepository(HealthLog)
    private readonly healthLogRepository: Repository<HealthLog>,
  ) {}

  async execute(command: UpdateHealthLogCommand): Promise<HealthLog> {
    const { id, updateHealthLogDto } = command;
    const healthLog = await this.healthLogRepository.preload({ LogID: id, ...updateHealthLogDto });
    if (!healthLog) {
      throw new NotFoundException(`HealthLog with ID ${id} not found`);
    }
    return this.healthLogRepository.save(healthLog);
  }
}
// في ملف: src/mortality/handlers/mortality.handlers.ts
import { CommandHandler, ICommandHandler, QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMortalityCommand, UpdateMortalityCommand, DeleteMortalityCommand } from '../commands/mortality.commands';
import { GetMortalityQuery, GetAllMortalitiesQuery } from '../queries/mortality.queries';
import { Mortality } from 'src/Core Models/Mortality';

// Command Handlers
@CommandHandler(CreateMortalityCommand)
export class CreateMortalityHandler implements ICommandHandler<CreateMortalityCommand> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) {}

  async execute(command: CreateMortalityCommand): Promise<Mortality> {
    const newMortality = this.mortalityRepository.create(command.createMortalityDto);
    return this.mortalityRepository.save(newMortality);
  }
}

@CommandHandler(UpdateMortalityCommand)
export class UpdateMortalityHandler implements ICommandHandler<UpdateMortalityCommand> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) {}

  async execute(command: UpdateMortalityCommand): Promise<Mortality> {
    const { MortalityID, ...rest } = command.updateMortalityDto;
    await this.mortalityRepository.update(MortalityID, rest);
    const updatedMortality = await this.mortalityRepository.findOne({ where: { MortalityID } });
    if (!updatedMortality) {
      throw new Error(`Mortality with ID ${MortalityID} not found after update.`);
    }
    return updatedMortality;
  }
}

@CommandHandler(DeleteMortalityCommand)
export class DeleteMortalityHandler implements ICommandHandler<DeleteMortalityCommand> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) {}

  async execute(command: DeleteMortalityCommand): Promise<void> {
    await this.mortalityRepository.delete(command.id);
  }
}

// Query Handlers
@QueryHandler(GetMortalityQuery)
export class GetMortalityHandler implements IQueryHandler<GetMortalityQuery> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) {}

  async execute(query: GetMortalityQuery): Promise<Mortality | null> {
    return this.mortalityRepository.findOne({ where: { MortalityID: query.id } });
  }
}

@QueryHandler(GetAllMortalitiesQuery)
export class GetAllMortalitiesHandler implements IQueryHandler<GetAllMortalitiesQuery> {
  constructor(@InjectRepository(Mortality) private readonly mortalityRepository: Repository<Mortality>) {}

  async execute(query: GetAllMortalitiesQuery): Promise<Mortality[]> {
    return this.mortalityRepository.find();
  }
}

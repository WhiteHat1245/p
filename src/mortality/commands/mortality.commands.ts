import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMortalityDto } from '../dto/create-mortality.dto';
import { UpdateMortalityDto } from '../dto/update-mortality.dto';
import { Mortality } from 'src/Core Models/Mortality';

// Create Command and Handler
export class CreateMortalityCommand {
  constructor(public readonly createMortalityDto: CreateMortalityDto) {}
}

@CommandHandler(CreateMortalityCommand)
export class CreateMortalityHandler implements ICommandHandler<CreateMortalityCommand> {
  constructor(
    @InjectRepository(Mortality)
    private readonly mortalityRepository: Repository<Mortality>,
  ) {}

  async execute(command: CreateMortalityCommand): Promise<Mortality> {
    const mortality = this.mortalityRepository.create(command.createMortalityDto);
    return this.mortalityRepository.save(mortality);
  }
}

// Update Command and Handler
export class UpdateMortalityCommand {
  constructor(
    public readonly id: number,
    public readonly updateMortalityDto: UpdateMortalityDto,
  ) {}
}

@CommandHandler(UpdateMortalityCommand)
export class UpdateMortalityHandler implements ICommandHandler<UpdateMortalityCommand> {
  constructor(
    @InjectRepository(Mortality)
    private readonly mortalityRepository: Repository<Mortality>,
  ) {}

  async execute(command: UpdateMortalityCommand): Promise<Mortality> {
    await this.mortalityRepository.update(command.id, command.updateMortalityDto);
    const updatedMortality = await this.mortalityRepository.findOneBy({ MortalityID: command.id });
    if (!updatedMortality) {
      throw new Error(`Mortality with ID ${command.id} not found after update.`);
    }
    return updatedMortality;
  }
}

// Delete Command and Handler
export class DeleteMortalityCommand {
  constructor(public readonly id: number) {}
}

@CommandHandler(DeleteMortalityCommand)
export class DeleteMortalityHandler implements ICommandHandler<DeleteMortalityCommand> {
  constructor(
    @InjectRepository(Mortality)
    private readonly mortalityRepository: Repository<Mortality>,
  ) {}

  async execute(command: DeleteMortalityCommand): Promise<void> {
    await this.mortalityRepository.delete(command.id);
  }
}
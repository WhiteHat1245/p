// src/poultry/commands/impl/create-poultry.command.ts
import { CreatePoultryDto } from '../../dto/create-poultry.dto.js';
export class CreatePoultryCommand {
  constructor(public readonly createPoultryDto: CreatePoultryDto) {}
}

// src/poultry/commands/impl/update-poultry.command.ts
import { UpdatePoultryDto } from '../../dto/update-poultry.dto.js';
export class UpdatePoultryCommand {
  constructor(
    public readonly id: number,
    public readonly updatePoultryDto: UpdatePoultryDto,
  ) {}
}

// src/poultry/commands/impl/remove-poultry.command.ts
export class RemovePoultryCommand {
  constructor(public readonly id: number) {}
}

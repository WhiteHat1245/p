// src/coop/commands/impl/create-coop.command.ts
import { CreateCoopDto } from '../../dto/create-coop.dto';

export class CreateCoopCommand {
  constructor(public readonly createCoopDto: CreateCoopDto) {}
}

// src/coop/commands/impl/update-coop.command.ts
import { UpdateCoopDto } from '../../dto/update-coop.dto';

export class UpdateCoopCommand {
  constructor(public readonly id: number, public readonly updateCoopDto: UpdateCoopDto) {}
}

// src/coop/commands/impl/remove-coop.command.ts
export class RemoveCoopCommand {
  constructor(public readonly id: number) {}
}
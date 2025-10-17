import { CreateFarmDto } from 'src/farm/dto/create-farm.dto.ts/create-farm.dto.ts';

export class CreateFarmCommand {
  constructor(public readonly createFarmDto: CreateFarmDto) {}
}

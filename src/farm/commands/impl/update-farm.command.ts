import { UpdateFarmDto } from 'src/farm/dto/update-farm.dto.ts/update-farm.dto.ts';

export class UpdateFarmCommand {
  constructor(
    public readonly id: number,
    public readonly updateFarmDto: UpdateFarmDto,
  ) {}
}

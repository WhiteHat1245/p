import { UpdateEggProductionDto } from 'src/EggProduction/dto/UpdateEggProductionDto/UpdateEggProductionDto';
export class UpdateEggProductionCommand {
  constructor(
    public readonly id: number,
    public readonly updateEggProductionDto: UpdateEggProductionDto,
  ) {}
}

import { CreateEggProductionDto } from "src/EggProduction/dto/CreateEggProductionDto/CreateEggProductionDto";

export class CreateEggProductionCommand {
  constructor(public readonly createEggProductionDto: CreateEggProductionDto) {}
}

import { CreateHealthLogDto } from "src/health-log/dto/create-health-log.dto.ts/create-health-log.dto.ts";

export class CreateHealthLogCommand {
  constructor(public readonly createHealthLogDto: CreateHealthLogDto) {}
}
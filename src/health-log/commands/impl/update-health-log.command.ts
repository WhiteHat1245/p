import { UpdateHealthLogDto } from "src/health-log/dto/update-health-log.dto.ts/update-health-log.dto.ts";

export class UpdateHealthLogCommand {
  constructor(public readonly id: number, public readonly updateHealthLogDto: UpdateHealthLogDto) {}
}
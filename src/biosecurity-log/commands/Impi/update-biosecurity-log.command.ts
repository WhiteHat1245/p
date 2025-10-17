import { UpdateBiosecurityLogDto } from '../../dto/update-biosecurity-log.dto';

export class UpdateBiosecurityLogCommand {
  constructor(
    public readonly id: number,
    public readonly updateBiosecurityLogDto: UpdateBiosecurityLogDto,
  ) {}
}

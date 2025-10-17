import { UpdateSlaughterhouseDto } from '../../dto/update-slaughterhouse.dto';

export class UpdateSlaughterhouseCommand {
  constructor(
    public readonly id: number,
    public readonly updateSlaughterhouseDto: UpdateSlaughterhouseDto,
  ) {}
}

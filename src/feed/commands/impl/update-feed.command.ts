import { UpdateFeedDto } from '../../dto/update-feed.dto';
export class UpdateFeedCommand {
  constructor(
    public readonly id: number,
    public readonly updateFeedDto: UpdateFeedDto,
  ) {}
}

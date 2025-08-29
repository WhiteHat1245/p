import { CreateFeedDto } from '../../dto/create-feed.dto';
export class CreateFeedCommand {
  constructor(public readonly createFeedDto: CreateFeedDto) {}
}

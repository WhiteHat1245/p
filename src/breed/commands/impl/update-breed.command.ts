import { UpdateBreedDto } from 'src/breed/dto/update-breed.dto.ts/update-breed.dto.ts';

export class UpdateBreedCommand {
  constructor(
    public readonly id: number,
    public readonly updateBreedDto: UpdateBreedDto,
  ) {}
}

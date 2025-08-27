import { CreateBreedDto } from "src/breed/dto/create-breed.dto.ts/create-breed.dto.ts";

export class CreateBreedCommand {
  constructor(public readonly createBreedDto: CreateBreedDto) {}
}
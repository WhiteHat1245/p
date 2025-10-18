import { IsString, IsNotEmpty } from 'class-validator';

export class CreateChartOfAccountsDto {
  @IsString()
  @IsNotEmpty()
  AccountName: string;

  @IsString()
  @IsNotEmpty()
  AccountType: string;
}

import { IsString, IsNumber, IsIn } from 'class-validator';

export class JournalEntryDetailDto {
  @IsString()
  accountId: string;

  @IsIn(['DEBIT', 'CREDIT'])
  type: 'DEBIT' | 'CREDIT';

  @IsNumber()
  amount: number;
}

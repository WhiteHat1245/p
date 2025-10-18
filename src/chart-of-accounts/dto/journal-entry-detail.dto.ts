export class JournalEntryDetailDto {
  id: string;
  accountId: string;
  type: 'DEBIT' | 'CREDIT';
  amount: number;
}

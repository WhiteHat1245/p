export class CreateJournalEntryDto {
  entries: Array<{
    accountId: string;
    amount: number;
    type: 'DEBIT' | 'CREDIT';
  }>;
  date: Date;
  memo: string;
}

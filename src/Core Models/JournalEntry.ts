import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { JournalEntryDetail } from './JournalEntryDetail';

@Entity()
export class JournalEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  memo: string;

  @OneToMany(() => JournalEntryDetail, (detail) => detail.journalEntry, {
    cascade: true,
  })
  details: JournalEntryDetail[];
}

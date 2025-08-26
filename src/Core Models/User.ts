import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './Role';
@Entity()
export class User { 
    
    @PrimaryGeneratedColumn()
    UserID: number;
  
    @Column({ length: 50 })
    Username: string;
  
    @Column({ length: 255 })
    PasswordHash: string;
  
    @Column({ length: 100 })
    Email: string;
  
    @Column()
    RoleID: number;
  
    @ManyToOne(() => Role, (role) => role.Users)
    Role: Role;
    
}
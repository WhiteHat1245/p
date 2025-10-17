import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';
@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  RoleID: number;

  @Column({ length: 50 })
  RoleName: string;

  @Column({ length: 255, nullable: true })
  Permissions: string;

  @OneToMany(() => User, (user) => user.Role)
  Users: User[];
}

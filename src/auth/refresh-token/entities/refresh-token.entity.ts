import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { IsNumber, IsOptional } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  import { User } from 'src/users/entities/user.entity';  
  @Entity({ name: 'refresh_token' })
  export class RefreshToken {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @PrimaryGeneratedColumn()
    id: number;
  
    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @Column({ name: 'is_revoke' })
    isRevoke: boolean;
  
    @Column()
    hash: string;
  
    @Column()
    expires: Date;
  }
  
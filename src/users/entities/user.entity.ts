import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/role/entity/role.entity";
import { Entity,PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne} from 'typeorm';



@Entity ({name:'users'})
export class User{
  @PrimaryGeneratedColumn({name:'id'})
  id: number
  @Column()
  name: string
  @Column()
  password:string
  @Column({default:false})
  
  isEnabled:boolean
  @ManyToOne(()=>Role,{eager:true})
  @JoinColumn()
  role:number
}

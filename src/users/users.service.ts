import { Injectable, Post } from '@nestjs/common';
import { AbstractService } from 'src/abstract/abstract.service';
import {InjectRepository} from "@nestjs/typeorm";
import { User } from './entities/user.entity';
import {DeleteResult, InsertResult, Repository} from 'typeorm';
import { userDto } from './dto/create-user.dto';
@Injectable()
export class UsersService extends AbstractService{
  constructor(@InjectRepository(User)private readonly usersRepository:Repository<User>){super(usersRepository)}

  /**
   * Method that creates an account with user's credentials and role
   * @author Enrique M. Pedroza 
   * @param usuario 
   * @returns {Promise<InsertResult>}
   */
  async signUp(usuario:Object):Promise<InsertResult>{
    const newUser = new User();
    newUser.name=usuario["name"];
    newUser.password=usuario["password"];
    newUser.role = usuario["roleId"];
    return this.create(newUser);
  }
  /**
   * Method that deletes a user account by it's ID
   * @param uId 
   * @returns {Promise<DeleteResult>}
   */
  async dropUser(uId:number):Promise<DeleteResult>{
    return this.delete({id:uId});
  }

}

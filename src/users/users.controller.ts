import { Body, Controller ,Delete,Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {AbstractController} from "../abstract/abstract.controller";
import {User} from "./entities/user.entity"
import { ApiTags } from '@nestjs/swagger';
import { userDto } from './dto/create-user.dto';
import { DeleteResult, InsertResult } from 'typeorm';
@ApiTags('Users')
@Controller('users')
export class UsersController extends AbstractController<User> {
    constructor(protected readonly _usersServices:UsersService){super(_usersServices);}

    /**
     * Method that saves a user with credentials
     * @author Enrique M. Pedroza
     * @param usuario petition that MUST contain name, password and roleID
     * @returns {Promise<InsertResult>}
     */
    @Post()
    createUser(@Body() usuario ){
        return this._usersServices.signUp(usuario);
    }
    /**
     * Method that deletes a user by a given Id
     * @author Enrique M. Pedroza
     * @param id 
     * @returns {Promise<DeleteResult>}
     */
    @Delete()
    deleteUser(@Body() id){
        return this._usersServices.dropUser(id["id"]);
    }

}

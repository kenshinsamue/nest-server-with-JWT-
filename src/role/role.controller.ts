import { Body, Controller } from '@nestjs/common';
import { AbstractController } from 'src/abstract/abstract.controller';
import { RoleService } from './role.service';
import { Role } from './entity/role.entity';
import { Post } from '@nestjs/common';
@Controller('role')
export class RoleController extends AbstractController<Role> {
  constructor(private readonly _roleService: RoleService){super(_roleService);}

  /**
   * Method that creates a new role 
   * @param roles 
   * @author Enrique M. Pedroza
   * @returns {Promise:<InsertResult>}
   */

  @Post()
  createRole(@Body() roles){
    console.log("Hemos recibido el siguiente rol: "+roles);
    return this._roleService.save(roles);
  }
}

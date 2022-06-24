import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/abstract/abstract.service';
import { InsertResult, Repository } from 'typeorm';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService extends AbstractService {
  constructor(@InjectRepository(Role) private readonly _roleRepository:Repository<Role>){super(_roleRepository);}
  /**
   * Method that conects to DB and creates the row with the new role
   * @author Enrique M. Pedroza
   * @param role 
   * @returns {Promise:<InsertResult>}
   */
  async save(role:Role):Promise<InsertResult>{
    const newRol = new Role();
    newRol.name = role["name"];
    return this._roleRepository.insert(newRol);
  }

}

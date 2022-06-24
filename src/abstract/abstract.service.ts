import { Injectable } from '@nestjs/common';
import { uid } from 'rand-token';
import {Repository, FindOperator} from 'typeorm';
/**
 * Abstract Service Class that will contain common features of all services in project
 */

@Injectable()
export abstract class AbstractService {

    protected constructor(protected readonly repository: Repository<any>){}

    /**
     * This method returns ONE concidence with the values given into @relations parameter
     * @public
     * @author Enrique M. Pedroza
     * @param conditions  Conditions of the consult
     * @param relations Relations between local values and table values
     * @returns {Promise<any>}
     */
    async findOne(condition,relations: any[] = []): Promise<any> {
        return this.repository.findOne({where:condition,relations});
    }

    /**
     * @public
     * @author Enrique M. Pedroza
     * @param data Data that is goint to be sent to the DB 
     * @returns {Promise<any>}
     */
    async create(data):Promise<any>{
        return this.repository.save( data);
    }

    /**
     * Method that deletes a row with coincidences of @conditions 
     * @public
     * @author Enrique M. Pedroza
     * @param condition 
     * @returns {Promise<any>}
     */
    async delete(condition):Promise<any>{
        return this.repository.delete(condition);
    }
    /**
     * Method that saves a row with a given data
     * @param data 
     * @returns {Promise<any>}
     */
    async save (data):Promise<any>{
        return this.repository.save(data);
    }
    
}

import { Controller } from '@nestjs/common';
import { AbstractService } from './abstract.service';

/**
 * This Controller class will get common-features of all controllers in the proyect
 * 
 * 
 */
@Controller('abstract')
export abstract class AbstractController <T>{
 protected constructor(
    protected readonly _service: AbstractService,
    protected readonly relations?: any[],
 )  {} 

}

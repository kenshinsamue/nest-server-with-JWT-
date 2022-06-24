import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local';
import { AuthService } from "../auth.service";
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService){super();}
  /**
   * Method that validates a user by a given id and password
   * @public 
   * @author Enrique M. Pedroza
   * @param username 
   * @param password 
   * @returns {Promise<any>}
   */
  async validate(username:string,password:string):Promise<any>{
    const user = await this.authService.validateUser(username,password);
    if(!user)
      throw new UnauthorizedException()
    return user;
  }
}
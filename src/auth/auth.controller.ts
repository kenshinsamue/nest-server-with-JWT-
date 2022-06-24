import {
  Controller,
  Headers,
  HttpCode,
  HttpException,
  Param,
  Post,
  Request,
  UnauthorizedException,
  Body,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor (private _authService: AuthService){}
  
  /**
   * Method that autenticates a user that's already registered 
   * @author Enrique M. Pedroza
   * @param req 
   * @returns
   */
  @Post("login")
  @ApiBody({
    schema:{
      type:'object',
      properties:{
        name:{type:'string'},
        password:{type:'string'}
      },
      required:['name','password']
    },
  })

  async login(@Body() req):Promise<any>{
    // we'll try to autenticate the given user and pass
    try{
      let userValidated = 
        await this._authService.validateUser(req["name"],req["password"]) // validates user's credentials with hashed password

        // if returned null exception
        if(userValidated == null) throw new UnauthorizedException();
        // else
        let authToken = await this._authService.login(req["name"]);

        return{
          id:userValidated['id'],
          role: userValidated['role']['id'],
          userToken:authToken
        }
    }
    catch(err){
      throw err;
    }
  }

  /**
   * Method that creates a new tokens for users already registered
   * @author Enrique M. Pedroza
   * @param req 
   * @returns 
   */

  @Post("signup")
  async signup(@Body() req):Promise<any>{
    return this._authService.signUp(req["name"]);
  }

  /**
   * Method that deletes users' token form DB
   * @param req 
   * @returns 
   */
  @Delete()
  async deleteUserTokens(@Body() req):Promise<any>{
    return this._authService._deleteToken(req["id"]);
  }
}




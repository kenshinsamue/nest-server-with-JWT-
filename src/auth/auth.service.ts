import { Injectable } from '@nestjs/common';
import { clear } from 'console';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/user.entity';
import { RefreshTokenService } from './refresh-token/refresh-token.service';
import { RefreshToken } from './refresh-token/entities/refresh-token.entity';
import {uid} from 'rand-token';
import {JwtService} from '@nestjs/jwt';
import { DeleteResult } from 'typeorm';
import { Role } from 'src/role/entity/role.entity';
/**
 * 
 * @class 
 * @author Enrique M. Pedroza
 * @param UsersService  Services of User Module
 * @param RefreshTokenService Services of RefreshToken Module
 * 
 */
@Injectable()
export class AuthService {
  constructor(
    private _userService:UsersService,
    private _refreshTokenService:RefreshTokenService,
    private _jwtService:JwtService){}

  /**
   * Method that validates a given user into DB
   * @public
   * @author Enrique M. Pedroza
   * @param username user's username at login 
   * @param pass user's password
   * @returns {Boolean | null}
   */

  public async validateUser (username:string,secret:string):Promise<any>{
    const condition = {name:username}
    // const relations = [User,Role];
    const user =await this._userService.findOne(condition);
    // check if user exists in DB
    if(user){
      const psswdMatching = await AuthService._verifyPassword(user.password,secret);
      if(psswdMatching){
        return user;
      }
    }
    return null;
  }

  /**
   * Method that validates a given hashed password with the user's password in DB
   * @private
   * @author Enrique M. Pedroza
   * @param clearPsswd is the password in clear test
   * @param hashedPsswd is the password hashed 
   * @returns {Boolean}
   */
  private static async _verifyPassword(clearPsswd:string,hashedPsswd:string){
      return bcrypt.compare(clearPsswd,hashedPsswd);
  }

  /**
   * This method gets a username and returns its access token and refresh access token (if it is not generated)
   * @public
   * @author Enrique M. Pedroza
   * @param username is the user's username
   * @returns {String | Object}
   */
  public async login(username:string):Promise<any>{
    const condition = {name:username};
    const user = await this._userService.findOne(condition);
    if( user['isEnabled'])
      return this._getAccessToken(user);
    return {
      access_token: "",
      refresh_token:""
    };
  }

  /**
   * Method that gets a username and creates both access token and refresh token   
   * @public
   * @author Enrique M. Pedroza
   * @param username 
   * @returns {Promise<any>}
   */
  public async signUp(username:string):Promise<any>{
    const condition = {name:username};
    const user = await this._userService.findOne(condition); // Gets the user Object from DB
    user.isEnabled= true;
    await this._userService.save(user);
    return this._getAccessToken(user); 
  }

  /**
   * @public
   * @author Enrique M. Pedroza
   * @param authToken
   * @returns {Promise<void>} 
   */
  public async logout(authToken: string):Promise<void>{
    const token: any = this._jwtService.decode(authToken);
    const user = await this._userService.findOne({id: token.userId});
    return this._refreshTokenService.deleteByUserId(user.id);
  }

  /**
   * Method that generates both access token and refresh token
   * @private
   * @author Enrique M. Pedroza
   * @param user user object that is an instance of User entity
   * @returns 
   */

  private async _getAccessToken(user:User){
    const payload = {userId:user.id};
    const refreshToken = 
    (await this._refreshTokenService.findByUserId(user.id)) ? // Does user have a token ?
      await this._refreshTokenService.findByUserId(user.id):  // True - Returns actual credentials
      await this._createRefreshToken(user);                   // False - Creates a new credentias
    return{ // both credentials
      access_token: this._jwtService.sign(payload),
      refreshToken: refreshToken.hash,
    };
  }
  /**
   * This method creates a 256 bits Refresh Token that expires in 7 days and set 
   * @private
   * @author Enrique M. Pedroza
   * @param user User's Entity
   * @returns {Promise<RefreshToken>}
   */
  private async _createRefreshToken(user:User):Promise<RefreshToken>{
    const refreshToken = new RefreshToken();
    refreshToken.isRevoke=false;
    // expire date
    const expires = new Date();
    expires.setDate(expires.getDate()+7);
    // config token and set a 256 bits hash
    refreshToken.expires = expires;
    refreshToken.hash= await bcrypt.hash(user.password,10);
    refreshToken.user=user;
    return this._refreshTokenService.create(refreshToken);

  }
  /**
   * Method that deletes the token of a given User ID
   * @public
   * @author Enrique M. Pedroza
   * @param uid 
   * @returns {Promise<DeleteResult>}
   */
  public async _deleteToken(uid:number):Promise<DeleteResult>{
    return this._refreshTokenService.delete({user:uid});
  }
}


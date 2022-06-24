import { Injectable } from "@nestjs/common";
import { AbstractService } from "src/abstract/abstract.service";
import { RefreshToken } from "./entities/refresh-token.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class RefreshTokenService extends AbstractService{
  constructor(
    @InjectRepository(RefreshToken)
    private readonly _refreshTokenRepository: Repository<RefreshToken>){
      super(_refreshTokenRepository);
    }

    /**
     * Consutl to DB get user's  tokens by a user ID given
     * @public
     * @author Enrique M. Pedroza
     * @param userId  
     * @returns {Promise<void>}
     */
    public async findByUserId(userId:number): Promise<RefreshToken>{
      return this.findOne({user:userId});
    }
    /**
     * Connect to DB and delete user's refresh by userID
     * @public
     * @author Enrique M. Pedroza
     * @param userId 
     * @returns {Promise<void>}
     */
    public async deleteByUserId(userId:number):Promise<void>{
      const refresh_token = await this.findOne({user:userId})
      return this.deleteByUserId(refresh_token);
    }
}
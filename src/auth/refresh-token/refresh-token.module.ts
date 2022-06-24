import { Module } from "@nestjs/common";
import { RefreshToken } from "./entities/refresh-token.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RefreshTokenService } from "./refresh-token.service";

@Module({
    imports: [TypeOrmModule.forFeature([RefreshToken])],
    providers:[RefreshTokenService],
    exports: [RefreshTokenService]
})
export class RefreshTokenModule{}
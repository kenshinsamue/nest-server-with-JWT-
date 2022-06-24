import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports:[
    SharedModule,
    RefreshTokenModule,
    UsersModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ],
  controllers: [AuthController],
  exports:[AuthService]  
})
export class AuthModule {}

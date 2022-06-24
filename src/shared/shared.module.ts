import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt-constants';

@Module({
  imports:[JwtModule.register({
    secret:jwtConstants.secret,
    signOptions:{expiresIn:'8h'}
  })],
  exports:[JwtModule]

})
export class SharedModule {}

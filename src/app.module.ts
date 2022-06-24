import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import {ConfigModule} from '@nestjs/config'; 
import {TypeOrmModule} from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';
import { RoleModule } from './role/role.module';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { Role } from './role/entity/role.entity';
import { User } from './users/entities/user.entity';
import { RefreshToken } from './auth/refresh-token/entities/refresh-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities:true,
      entities:[Role,User,RefreshToken],
      synchronize: true
      }),
    AuthModule,
    UsersModule,
    RoleModule,
    SharedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

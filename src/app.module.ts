import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

import {ConfigModule} from "@nestjs/config"
import { envsConfiguration } from './config/envs.config';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './auth/strategies/jwt.strategy';


@Module({
  imports: [

    ConfigModule.forRoot({
      load:[envsConfiguration]
    }),

    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET
    }),
  
    MongooseModule.forRoot("mongodb://localhost:27017/tasks_api"),
    
    UserModule,
    
    TaskModule,
    
    AuthModule,
    

  
  ],
  controllers: [AppController],
  providers: [ 
     {
      provide: APP_GUARD,
      useClass: JWTAuthGuard,
    },
    AppService ],
})
export class AppModule {}

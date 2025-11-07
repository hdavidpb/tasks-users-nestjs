import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[
    UserModule,

    MongooseModule.forFeature([{name:User.name,schema:UserSchema}])

  ],
  controllers: [AuthController],
  providers: [AuthService ,ConfigService ],
})
export class AuthModule {}

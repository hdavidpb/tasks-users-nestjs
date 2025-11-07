import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Tokens } from 'src/user/interfaces/token.interface';

@Injectable()
export class AuthService {
  private jwtSecret:string;


  constructor (
     @InjectModel(User.name)
    private readonly userModel: Model<User>,

    private readonly userService:UserService,
    private readonly configService:ConfigService,
    private readonly jwtSvc:JwtService
    
  ) {

    this.jwtSecret =  this.jwtSecret = this.configService.get("jwtSecret")!
    
  }


  async login(loginAuth:LoginAuthDto){

      const user: User | null = await this.userModel.findOne({ email:loginAuth.email });
  
      if (!user) throw new BadRequestException('Invalid Credentials');
  
      const isPasswordValid = await bcrypt.compare(loginAuth.password, user!.password);
  
      if (!isPasswordValid) throw new BadRequestException('Invalid Credentials');
  
      if (user && isPasswordValid) {
          const tokens = await this.generateTokens(user)
          
        return tokens;
      }

  }


   async register(registerUser:CreateUserDto){
      const newUser = await this.userService.create(registerUser);

      return {
        newUser,
        message:"User created successfully"
      }


  }

   async refreshToken (refreshToken:string) {

    try {

      const user = await this.jwtSvc.verify(refreshToken,{secret:this.jwtSecret});

      const payload:any =  {
        sub: user._id,
        email:user.email,
        name:user.name,
      };
      const tokens = await this.generateTokens(payload);

      return tokens



    } catch (error) {
      console.log(error);
      throw new BadRequestException("Check your token")
    }

  }



  
    private async generateTokens(user:User):Promise<Tokens> {
  
      const jwtPayload = {
          sub: user._id,
          email:user.email,
          name:user.name,
        };
  
  
          const accessToken = await this.jwtSvc.signAsync(jwtPayload, {
          secret: this.jwtSecret,
          expiresIn: '1d',
        });
  
         const refreshToken = await this.jwtSvc.signAsync(jwtPayload, {
          secret: this.jwtSecret,
          expiresIn: '7d',
        });
  
        return { access_token: accessToken ,refresh_token:refreshToken};
  
  
    }
  


}




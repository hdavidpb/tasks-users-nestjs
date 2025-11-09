import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  
  @Get('')
  findUserInfo( @Req() request:Request & { userId:string }) {
    return this.userService.findUserById(request.userId);
  }


  @Get('all')
  findAll() {
    return this.userService.findAll();
  }


}

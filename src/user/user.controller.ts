import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  
  @Get(':id')
  findUserInfo(@Param("id",ParseMongoIdPipe) id:string, @Req() request:Request & { userId:string }) {
    return this.userService.findUserById(id);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }


}

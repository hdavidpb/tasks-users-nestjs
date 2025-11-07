import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  
  @Get(':id')
  findUserInfo(@Param("id") id:string, @Req() request:Request & { userId:string }) {
    console.log("AQUÍ!!")
    return this.userService.findUserById(id);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }


}

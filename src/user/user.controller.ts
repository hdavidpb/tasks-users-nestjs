import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JWTAuthGuard } from '../auth/strategies/jwt.strategy';



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  @UseGuards(JWTAuthGuard)
  @Get(':id')
  findUserInfo(@Param("id") id:string, @Req() request:Request & { userId:string }) {
    return this.userService.findUserById(id);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }


}

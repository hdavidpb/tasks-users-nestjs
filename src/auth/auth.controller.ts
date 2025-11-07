import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  loginUser(@Body() loginUser: LoginAuthDto) {
    return this.authService.login(loginUser);
  }

  @Post('register')
  registerUser(@Body() createUser: CreateUserDto) {
    return this.authService.register(createUser);
  }

  //TODO: Refactor

  @Post('refresh')
  refreshToken(@Req() request: Request) {
    const [_, token] = request.headers['authorization']?.split(' ') || [];

    return this.authService.refreshToken(token);
  }
}

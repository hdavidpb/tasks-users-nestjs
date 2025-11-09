import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {


  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,

  ) {}

  

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const newUser: User = await this.userModel.create({
        ...createUserDto,
        password: hashedPassword,
      });

      return newUser;
    } catch (error) {
      handleError(error);
      return null;
    }
  }


  async findUserById(id:string) {

    const user = await this.userModel.findById(id).select('-password -__v');
 
    if(!user) throw new BadRequestException("User not found");

    return user;

  }




  findAll() {
    return `This action returns all user`;
  }
}



const handleError = (error: any) => {
  if (error?.code === 11000) {
    throw new BadRequestException('User already exist');
  }

  console.log(error);
  throw new InternalServerErrorException('Error inesperado , mira los Logs');
};

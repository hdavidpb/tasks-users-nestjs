import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserService } from 'src/user/user.service';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModule: Model<Task>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const user = await this.userService.findUserById(userId);

    const newTask = await this.taskModule.create({ ...createTaskDto, user });

    return {
      user,
      newTask,
      message: 'This action adds a new task',
    };
  }

  async findAll(userId:string) {

    const user:User|null = await this.userService.findUserById(userId);

    const tasks = await this.taskModule.find({user:user}).select('-user -__v').lean();


    return tasks
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

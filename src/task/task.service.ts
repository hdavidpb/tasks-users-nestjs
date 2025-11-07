import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findAll(userId: string) {
    const user: User | null = await this.userService.findUserById(userId);

    const tasks = await this.taskModule
      .find({ user: user })


    return tasks;
  }

  async findOne(id:string) {

    const task = await this.taskModule.findById(id);
    if (!task) throw new BadRequestException('Task not found');

    return task;
  }

  async update( id: string, updateTaskDto: UpdateTaskDto) {
    
    const task:Task = await this.findOne(id);

    const newTask = await task.updateOne(updateTaskDto)


    
    return {
      message:"Task updated",
      newTask
    }
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}

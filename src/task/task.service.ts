import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserService } from 'src/user/user.service';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/entities/user.entity';
import { QueryParamsTaskDto } from './dto/query-params.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModule: Model<Task>,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto) {
    const user = await this.userService.findUserById(userId);

    const task:Task = await this.taskModule.create({ ...createTaskDto, user });

    return task;
  }

  async findAll(userId: string,query:QueryParamsTaskDto) {
    const user: User | null = await this.userService.findUserById(userId);


    
  const filters: any = {};

  // Si viene title en el query, lo agregas
  if (query.query) {
    // Puedes usar regex para búsqueda parcial (opcional)
    filters.title = { $regex: query.query, $options: 'i' };
  }

  // Si viene status, también lo agregas
  if (query.status) {
    filters.status = query.status;
  }

   if (query.tag) {
    filters.tags = { $regex: new RegExp(query.tag, 'i') };
  }

    const tasks = await this.taskModule
      .find({ user: user,...filters }).select("-__v -user")


    return tasks;
  }

  async findOne(id:string) {

    const task = await this.taskModule.findById(id).select("-user -__v");
    if (!task) throw new BadRequestException('Task not found');

    return task;
  }

  async update( id: string, updateTaskDto: UpdateTaskDto) {
    
    const task:Task = await this.findOne(id);

    const updated = await task.updateOne(updateTaskDto);


    
    return {
      wasUpdated:true,
      modifiedCount:updated.modifiedCount
    }
  }

  async remove(id: string) {

    const {deletedCount} = await this.taskModule.deleteOne({_id:id});

    if(deletedCount === 0) throw new BadRequestException(`Task with id: ${id} not found`)


    return {
      message:"Task deleted successfully",
      deletedCount
    }
  }
}

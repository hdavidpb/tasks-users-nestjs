import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create/:id')
  create(@Param("id") id:string , @Body() createTaskDto: CreateTaskDto ) {
    return this.taskService.create(id,createTaskDto);
  }


 
  @Get("all")
  findAll(@Req() request: Request & {userId:string}) {


    return this.taskService.findAll(request.userId);
  }

 
  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.taskService.findOne(id);
  }

 
  @Patch(':id')
  update(@Param('id',ParseMongoIdPipe)  id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}

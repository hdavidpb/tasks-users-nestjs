import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { QueryParamsTaskDto } from './dto/query-params.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  create( @Body() createTaskDto: CreateTaskDto, @Req() request: Request & {userId:string} ) {

    return this.taskService.create(request.userId,createTaskDto);
  }


 
  @Get("all")
  findAll(@Req() request: Request & {userId:string}, @Query() query:QueryParamsTaskDto) {
    
    return this.taskService.findAll(request.userId,query);
  }

 
  @Get(':id')
  findOne(@Param('id',ParseMongoIdPipe) id: string) {

    return this.taskService.findOne(id);
  }

 
  @Patch(':id')
  update(@Param('id',ParseMongoIdPipe)  id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseMongoIdPipe) id: string) {
    return this.taskService.remove(id);
  }
}

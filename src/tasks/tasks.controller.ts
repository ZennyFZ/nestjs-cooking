import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskQueryDto } from './dto/query-task.dto';
import { TimestampInterceptor } from 'src/common/interceptors/timestamp.interceptor';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@ApiTags('tasks')
@UseInterceptors(TimestampInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get all tasks' })
  @Get()
  findAll(@Query() query: TaskQueryDto) {
    return this.tasksService.paginate(query);
  }

  @ApiOperation({ summary: 'Search tasks by keyword' })
  @Get('search')
  search(@Query('keyword') keyword: string) {
    return this.tasksService.findAll(keyword);
  }

  @ApiOperation({ summary: 'Get a task by id' })
  @Get(':id')
  findOne(@Param('id', new ParseObjectIdPipe()) id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new task' })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @ApiOperation({ summary: 'Update a task by id' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete a task by id' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}

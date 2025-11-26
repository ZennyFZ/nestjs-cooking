import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQueryDto } from './dto/query-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name)
    private taskModel: Model<TaskDocument>,
  ) {}

  findAll(keyword?: string) {
    if (!keyword) return this.taskModel.find().exec();

    const lower = keyword.toLowerCase();
    return this.taskModel
      .find({
        $or: [
          { title: { $regex: lower, $options: 'i' } },
          { description: { $regex: lower, $options: 'i' } },
        ],
      })
      .exec();
  }

  paginate(query: TaskQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    return this.taskModel.find().skip(skip).limit(limit).exec();
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    return this.taskModel.create(createTaskDto);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();

    if (!updatedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return updatedTask;
  }

  async remove(id: string): Promise<void> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();

    if (!deletedTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }
}

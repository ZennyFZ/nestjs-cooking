import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { TaskType } from './graphql/task.type';
import { CreateTaskInput, UpdateTaskInput } from './graphql/task.input';
import { CreateTaskDto } from './dto/create-task.dto';

@Resolver(() => TaskType)
export class TasksResolver {
  constructor(private tasksService: TasksService) {}

  @Query(() => [TaskType])
  async tasks() {
    return this.tasksService.findAll();
  }

  @Query(() => TaskType)
  async task(@Args('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => TaskType)
  async createTask(@Args('input') input: CreateTaskInput) {
    return this.tasksService.create(input as CreateTaskDto);
  }

  @Mutation(() => TaskType)
  async updateTask(
    @Args('id') id: string,
    @Args('input') input: UpdateTaskInput,
  ) {
    return this.tasksService.update(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id') id: string) {
    await this.tasksService.remove(id);
    return true;
  }
}

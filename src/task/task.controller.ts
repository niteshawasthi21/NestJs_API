import { UpdateTaskDto } from './taskDto/update-task.dto';
import { TasksService } from './task.service';
import { CreateTaskDto } from './taskDto/create-task.dto';
import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException,
  ConflictException,
} from '@nestjs/common'; 
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Create a new task.
   * @param createTaskDto - The task creation data.
   * @returns The newly created task.
   */
  @Post('/taskcreation')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    try {
      return await this.tasksService.create(
         createTaskDto
      );
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  /**
   * Find a task by ID.
   * @param id - The task's ID.
   * @returns The task entity.
   * @throws NotFoundException if the task is not found.
   */
  @Get('/:id')
  async findTask(@Param('id') id: string) {
    const task = await this.tasksService.findOne(parseInt(id));
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  /**
   * Find all tasks or filter tasks by title.
   * @param title - The title to filter tasks by.
   * @returns An array of task entities.
   */
  @Get()
  async findAllTasks(@Query('title') title?: string) {
    return this.tasksService.findAll(title);
  }

  /**
   * Update a task by ID.
   * @param id - The task's ID.
   * @param updateTaskDto - The updated task data.
   * @returns The updated task entity.
   * @throws NotFoundException if the task is not found.
   */
  @Patch('/:id')
  async updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(parseInt(id), updateTaskDto);
  }

  /**
   * Remove a task by ID.
   * @param id - The task's ID.
   * @returns The removed task entity.
   * @throws NotFoundException if the task is not found.
   */
  @Delete('/:id')
  async removeTask(@Param('id') id: string) {
    return this.tasksService.remove(parseInt(id));
  }
}

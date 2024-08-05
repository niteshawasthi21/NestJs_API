import { UpdateTaskDto } from './taskDto/update-task.dto';
import { CreateTaskDto } from './taskDto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity'; // Assume you have a Task entity
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  /**
   * Create a new task.
   * @param createTaskDto - The task data transfer object.
   * @returns The created task entity.
   */
  async create(createTaskDto: CreateTaskDto){
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Find a task by ID.
   * @param id - The task's ID.
   * @returns The task entity.
   * @throws NotFoundException if the task is not found.import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

   */
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  /**
   * Find all tasks or filter tasks by title.
   * @param title - The title to search for.
   * @returns An array of task entities.
   */
  async findAll(title?: string){
    if (title) {
      return this.taskRepository.find({ where: { title } });
    }
    return this.taskRepository.find();
  }

  /**
   * Update a task with new attributes.
   * @param id - The task's ID.
   * @param updateTaskDto - The update task data transfer object.
   * @returns The updated task entity.
   * @throws NotFoundException if the task is not found.
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  /**
   * Remove a task by ID.
   * @param id - The task's ID.
   * @returns The removed task entity.
   * @throws NotFoundException if the task is not found.
   */
  async remove(id: number): Promise<Task> {
    const task = await this.findOne(id);
    return this.taskRepository.remove(task);
  }
}
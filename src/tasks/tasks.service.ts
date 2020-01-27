import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v4';
import { Task, TaskStatus } from './task.model';
import { NewTaskDTO } from './dto/new-task-dto';
import { TaskFilterDTO } from './dto/task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilteredTasks({ search, status }: TaskFilterDTO): Task[] {
    let tasks = this.getAllTasks();

    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    if (status) {
      tasks = tasks.filter(
        task => task.status.toLowerCase() === status.toLowerCase(),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(t => t.id === id);

    if (!found) {
      throw new NotFoundException(`task with id "${id}" not found`);
    }

    return found;
  }

  createTask({ title, description }: NewTaskDTO): Task {
    const task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    // Save the new task...
    this.tasks.push(task);

    // & return it
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}

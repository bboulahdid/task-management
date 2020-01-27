import { Repository, EntityRepository } from 'typeorm';
import { Task } from './task.entity';
import { NewTaskDTO } from './dto/new-task-dto';
import { TaskStatus } from './task-status.enum';
import { TaskFilterDTO } from './dto/task-filter-dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks({ search, status }: TaskFilterDTO): Promise<Task[]> {
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  async createTask({ title, description }: NewTaskDTO): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    return this.save(task);
  }
}

import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class TaskFilterDTO {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}

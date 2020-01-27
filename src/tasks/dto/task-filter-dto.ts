import { IsOptional, IsNotEmpty, IsIn } from 'class-validator';
import { TaskStatus } from '../task.model';

export class TaskFilterDTO {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: string;
}

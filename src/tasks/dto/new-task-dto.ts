import { IsNotEmpty } from 'class-validator';

export class NewTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

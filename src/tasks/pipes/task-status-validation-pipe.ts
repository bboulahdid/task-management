import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  private readonly allowedStatus = Object.values(TaskStatus);

  private isStatusValid(status): boolean {
    return this.allowedStatus.includes(status);
  }

  transform(value: string) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }
}

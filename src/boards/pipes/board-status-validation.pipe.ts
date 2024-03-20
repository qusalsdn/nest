import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly statusOptions: string[] = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];
  transform(value: string) {
    value = value.toUpperCase();
    if (!this.statusOptions.includes(value))
      throw new BadRequestException(`${value}라는 상태는 존재하지 않습니다.`);
    return value;
  }
}

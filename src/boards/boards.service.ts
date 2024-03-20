import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { createBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  createBoard(createBoardDto: createBoardDto): Board {
    const { title, description } = createBoardDto;
    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    };
    this.boards.push(board);
    return board;
  }

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);
    if (!found)
      throw new NotFoundException(
        `'${id}' id를 가진 게시물은 존재하지 않습니다.`,
      );
    return found;
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }

  deleteBoard(id: string): Board[] {
    const found = this.getBoardById(id);
    if (!found)
      throw new NotFoundException(
        `'${id}' id를 가진 게시물은 존재하지 않습니다.`,
      );
    this.boards = this.boards.filter((board) => board.id !== id);
    return this.boards;
  }
}

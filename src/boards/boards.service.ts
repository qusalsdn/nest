import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status-enum';
import { createBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async createBoard(createBoardDto: createBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.boardRepository.save(board);
    return board;
  }

  async getAllBoards(): Promise<Board[]> {
    const board = await this.boardRepository.find();
    return board;
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });

    if (!found)
      throw new NotFoundException(
        `'${id}' id를 가진 게시물은 존재하지 않습니다.`,
      );
    return found;
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

  async deleteBoard(id: number): Promise<Board[]> {
    const found = this.getBoardById(id);
    if (!found)
      throw new NotFoundException(
        `'${id}' id를 가진 게시물은 존재하지 않습니다.`,
      );
    await this.boardRepository.delete(id);
    const board = this.boardRepository.find();
    return board;
  }
}

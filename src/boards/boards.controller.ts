import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status-enum';
import { createBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: createBoardDto): Promise<Board> {
    return this.boardsService.createBoard(body);
  }

  @Get('/')
  getAllBoard(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get(':id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Patch(':id')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete(':id')
  deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<Board[]> {
    return this.boardsService.deleteBoard(id);
  }
}

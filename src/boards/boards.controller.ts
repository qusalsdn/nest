import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { createBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() body: createBoardDto): Board {
    return this.boardsService.createBoard(body);
  }

  @Get('/')
  getAllBoard(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Get(':id')
  getBoardById(@Param('id') id: string): Board {
    return this.boardsService.getBoardById(id);
  }

  @Patch(':id')
  updateBoardStatus(
    @Param('id') id: string,
    @Body('status') status: BoardStatus,
  ): Board {
    return this.boardsService.updateBoardStatus(id, status);
  }

  @Delete(':id')
  deleteBoard(@Param('id') id: string) {
    return this.boardsService.deleteBoard(id);
  }
}

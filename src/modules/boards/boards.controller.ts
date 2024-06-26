import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Category } from '@prisma/client';
import { Public } from '../../auth/public.decorator';

@Controller('boards')
@ApiBearerAuth()
@ApiTags('Boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post('/createBoard')
  @ApiCreatedResponse({description: 'Board created', type: CreateBoardDto, status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiConflictResponse({ description: 'Board already exists', status: 409})
  @ApiOperation({summary: 'Creates a board'})
  async createBoard(@Body() createBoardDto: CreateBoardDto, @Request() req) {
    let createdBy = req.user.id;
    return this.boardsService.createBoard(createBoardDto, createdBy);
  }

  @Public()
  @Get('/getAllBoards/:page')
  @ApiOkResponse({description: 'Success', status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({summary: 'Returns all boards by page'})
  async getAllBoards(@Param('page') page: number) {
    return this.boardsService.getAllBoards(page);
  }

  @Public()
  @Get('/getBoardById/:id')
  @ApiOkResponse({description: 'Success', status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({summary: 'Returns board by id'})
  async getBoardById(@Param('id') id: number) {
    return this.boardsService.getBoardById(+id);
  }

  @Public()
  @Get('/getBoardByName/:name/:page')
  @ApiOkResponse({description: 'Success', status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiParam({ name: 'name', schema: { default: "board" } })
  @ApiOperation({summary: 'Returns boards by name'})
  async getBoardsByName(@Param('name') name: string, @Param('page') page: number) {
    return this.boardsService.getBoardsByName(name, page);
  }

  @Public()
  @Post('/getBoardsByCategory/:page')
  @ApiOkResponse({description: 'Success', status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({summary: 'Returns boards by category'})
  async getBoardsByCategory(@Param('page') page: number, @Body() category: Category[]) {
    return this.boardsService.getBoardsByCategory(category, page);
  }

  @Patch('/updateBoard/:id')
  @ApiConsumes("multipart/form-data")
  @ApiOkResponse({description: 'Success', type: UpdateBoardDto, status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({summary: 'Update board by id'})
  async updateBoard(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto, @Request() req) {
    let user: number;
    if(req.user.isAdmin == true) {
      user == 0;
    } else {
      user == req.user.id;
    }
    return this.boardsService.updateBoard(+id, updateBoardDto, user);
  }

  @Delete('/deleteBoard/:id')
  @ApiOkResponse({description: 'Success', type: UpdateBoardDto, status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({summary: 'Delete board by id'})
  async deleteBoard(@Param('id') id: number, @Request() req) {
    let user: number;
    if(req.user.isAdmin == true) {
      user == 0;
    } else {
      user == req.user.id;
    }
    return this.boardsService.deleteBoard(+id, user);
  }
}

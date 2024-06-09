import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { Public } from '../../auth/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';


@Controller('threads')
@ApiBearerAuth()
@ApiTags('Threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Public()
  @Post('/createThread/:board')
  @ApiCreatedResponse({description: 'Thread created', type: CreateThreadDto, status: 201})
  @ApiBadRequestResponse({ description: 'Invalid request', status: 400})
  @ApiConflictResponse({ description: 'Board already exists', status: 409})
  @ApiOperation({summary: 'Creates a board'})
  @UseInterceptors(FileInterceptor('file'))
  async createThread(@Param('board') board: number, @Body() createThreadDto: CreateThreadDto, @UploadedFile('file') file: Express.Multer.File) {
    return this.threadsService.createThread(board, createThreadDto, file);
  }

  // @Public()
  // @Get()
  // findAll() {
  //   return this.threadsService.findAll();
  // }

  // @Public()
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.threadsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto) {
  //   return this.threadsService.update(+id, updateThreadDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.threadsService.remove(+id);
  // }
}

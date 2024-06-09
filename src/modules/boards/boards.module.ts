import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, PrismaService],
  exports: [PrismaService],
})
export class BoardsModule {}

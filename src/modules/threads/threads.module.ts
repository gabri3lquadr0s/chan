import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { PrismaService } from 'src/db/prisma.service';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, PrismaService],
  exports: [ThreadsService],
})
export class ThreadsModule {}

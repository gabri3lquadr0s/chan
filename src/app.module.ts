import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardsModule } from './modules//boards/boards.module';
import { ThreadsModule } from './modules//threads/threads.module';
import { RepliesModule } from './modules/replies/replies.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [BoardsModule, ThreadsModule, RepliesModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

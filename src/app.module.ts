import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './config';
import { TypeOrmService } from './shared';
import { AppController } from './app.controller';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { BoardModule } from './api/board/board.module';
import { TaskModule } from './api/task/task.module';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    ConfigModule,
    UserModule,
    AuthModule,
    BoardModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}

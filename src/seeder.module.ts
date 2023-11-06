import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmService } from './shared';
import { User } from './api/user/user.entity';
import { Board } from './api/board/board.entity';
import { Task } from './api/task/task.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmService }),
    TypeOrmModule.forFeature([User, Board, Task]),
    ConfigModule,
  ],
  controllers: [],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}

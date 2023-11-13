import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config';
import { CryptoService, TypeOrmService } from './shared';
import { HashService } from './common';
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
  providers: [
    SeederService,
    {
      provide: HashService,
      useClass: CryptoService,
    },
  ],
  exports: [SeederService],
})
export class SeederModule {}

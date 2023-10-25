import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from './config';
import { TypeOrmService } from './shared';
import { AppController } from './app.controller';
import { UserModule } from './api/user';
import { AuthModule } from './api/auth';

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
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}

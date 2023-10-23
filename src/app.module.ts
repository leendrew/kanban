import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ConfigService, ConfigModule } from './config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        ...config.db,
        entities: [join(__dirname, '..', 'api', '**', '*.entity.js')],
        synchronize: config.app.nodeEnv === 'development' ? true : false,
        logging: config.app.nodeEnv === 'development' ? false : true,
        ssl: config.app.nodeEnv === 'development' ? false : true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}

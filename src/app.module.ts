import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppConfigService, ConfigModule } from './config';
import { HashBase } from './common';
import { HashService } from './shared';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join('..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [AppConfigService],
      useFactory: (config: AppConfigService) => ({
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
  providers: [
    {
      provide: HashBase,
      useClass: HashService,
    },
  ],
  exports: [],
})
export class AppModule {}

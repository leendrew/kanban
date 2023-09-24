import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { getConfig, type Config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getConfig],
      envFilePath: join('..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService<Config>],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        database: config.get('db.name'),
        host: config.get('db.host'),
        port: config.get('db.port'),
        username: config.get('db.user'),
        password: config.get('db.pass'),
        entities: [join(__dirname, '..', 'api', '**', '*.entity.js')],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}

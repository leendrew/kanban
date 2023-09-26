import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { ConfigModule, DBConfigService } from './config';

@Module({
  imports: [
    // NestConfigModule.forRoot({
    //   isGlobal: true,
    //   envFilePath: join('..', '.env'),
    // }),
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [DBConfigService],
      useFactory: (dbConfigService: DBConfigService) => ({
        type: 'postgres',
        ...dbConfigService.config,
        entities: [join(__dirname, '..', 'api', '**', '*.entity.js')],
        synchronize: true,
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

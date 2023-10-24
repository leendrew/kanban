import { join } from 'node:path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ConfigService, ConfigModule } from './config';
import { UsersModule } from './api/users';
import { AuthModule } from './api/auth';

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
        entities: [join(__dirname, 'api', '**', '*.entity.js')],
        migrations: [join(__dirname, 'migrations', '*.ts')],
        synchronize: config.app.nodeEnv === 'development' ? true : false,
        logging: config.app.nodeEnv === 'development' ? false : true,
        ssl: config.app.nodeEnv === 'development' ? false : true,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}

import { join } from 'node:path';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '../config';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const config = this.configService;
    const isDev = config.app.nodeEnv === 'development';

    return {
      type: 'postgres',
      ...config.db,
      entities: [join(__dirname, '..', 'api', '**', '*.entity.js')],
      migrations: [join(__dirname, '..', 'database', 'migrations', '*.ts')],
      synchronize: isDev ? true : false,
      logging: isDev ? false : true,
      ssl: isDev ? false : true,
    };
  }
}

import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { BaseConfig } from '../shared/base.config';

type DBEnv = {
  database: {
    key: 'DB_NAME';
    type: string;
  };
  host: {
    key: 'DB_HOST';
    type: string;
  };
  port: {
    key: 'DB_PORT';
    type: number;
  };
  username: {
    key: 'DB_USER';
    type: string;
  };
  password: {
    key: 'DB_PASS';
    type: string;
  };
};

@Injectable()
export class DBConfigService extends BaseConfig<DBEnv> {
  constructor(protected readonly configService: ConfigService) {
    super(configService);
  }

  public get config() {
    return {
      database: this.getEnvValue('DB_NAME'),
      host: this.getEnvValue('DB_HOST'),
      port: this.getEnvValue('DB_PORT', true),
      username: this.getEnvValue('DB_USER'),
      password: this.getEnvValue('DB_PASS'),
    };
  }
}

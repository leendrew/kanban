import { Injectable } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import { BaseConfig } from '../shared/base.config';

type AppEnv = {
  nodeEnv: {
    key: 'NODE_ENV';
    type: string;
  };
  port: {
    key: 'SERVER_PORT';
    type: number;
  };
};

@Injectable()
export class AppConfigService extends BaseConfig<AppEnv> {
  constructor(protected readonly configService: ConfigService) {
    super(configService);
  }

  public get config() {
    return {
      nodeEnv: this.getEnvValue('NODE_ENV'),
      port: this.getEnvValue('SERVER_PORT', true),
    };
  }
}

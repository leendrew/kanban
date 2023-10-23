import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type EnvType = Record<string, { key: string; type: string | number }>;
type ConfigType<T extends EnvType> = { [Key in keyof T]: T[Key]['type'] };

// TODO: refactor with variables, example: const appEnv: EnvType = { ... };
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
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  private getEnvValue<T extends EnvType, U extends T[keyof T]['type']>(
    envKey: `${T[keyof T]['key']}`,
    isNumber: boolean = false,
  ): U {
    const envValue = this.configService.get(envKey);
    if (!envValue) {
      throw new Error(`Make sure that '${envKey}' really exist in your .env file`);
    }
    return isNumber ? parseInt(envValue, 10) : envValue;
  }

  public get app(): ConfigType<AppEnv> {
    return {
      nodeEnv: this.getEnvValue<AppEnv, string>('NODE_ENV'),
      port: this.getEnvValue<AppEnv, number>('SERVER_PORT', true),
    };
  }

  public get db(): ConfigType<DBEnv> {
    return {
      database: this.getEnvValue<DBEnv, string>('DB_NAME'),
      host: this.getEnvValue<DBEnv, string>('DB_HOST'),
      port: this.getEnvValue<DBEnv, number>('DB_PORT', true),
      username: this.getEnvValue<DBEnv, string>('DB_USER'),
      password: this.getEnvValue<DBEnv, string>('DB_PASS'),
    };
  }
}

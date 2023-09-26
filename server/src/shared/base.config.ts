import type { ConfigService } from '@nestjs/config';

type EnvType = Record<string, { key: string; type: string | number }>;

export abstract class BaseConfig<T extends EnvType> {
  constructor(protected readonly configService: ConfigService) {}

  protected getEnvValue<U extends boolean = false>(
    envKey: `${T[keyof T]['key']}`,
    isNumber?: U,
  ): U extends true ? number : string;
  protected getEnvValue(envKey: `${T[keyof T]['key']}`, isNumber: boolean = false) {
    const envValue = this.configService.get(envKey);
    if (!envValue) {
      throw new Error(`Make sure that '${envKey}' really exist in your .env file`);
    }
    return isNumber ? parseInt(envValue, 10) : envValue;
  }

  protected abstract get config(): { [Key in keyof T]: T[Key]['type'] };
}

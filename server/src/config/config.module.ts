import { Global, Module, type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './app.config.service';
import { DBConfigService } from './db.config.service';
import { join } from 'node:path';

// const providers: Provider[] = [AppConfigService, DBConfigService];
// const providers: Provider[] = [AppConfigService, DBConfigService, ConfigService];

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      // isGlobal: true,
      envFilePath: join('..', '.env'),
    }),
  ],
  providers: [ConfigService, AppConfigService, DBConfigService],
  exports: [AppConfigService, DBConfigService],
})
export class ConfigModule {}

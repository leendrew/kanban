import { Global, Module, type Provider } from '@nestjs/common';
import { AppConfigService } from './config.service';

const providers: Provider[] = [AppConfigService];

@Global()
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class ConfigModule {}

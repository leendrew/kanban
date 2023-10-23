import { Global, Module, type Provider } from '@nestjs/common';
import { ConfigService } from './config.service';

const providers: Provider[] = [ConfigService];

@Global()
@Module({
  imports: [],
  providers: [...providers],
  exports: [...providers],
})
export class ConfigModule {}

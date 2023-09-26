import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { AppConfigService, ConfigModule } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // console.log(app.get(AppConfigService));
  // const appConfigService = app.get(AppConfigService);
  // await app.listen(appConfigService.config.port);
  // console.log(app.select(ConfigModule).get(AppConfigService));
  await app.listen(8080);
}
bootstrap();

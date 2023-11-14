import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const config = app.get(ConfigService);
  const isDev = config.app.nodeEnv === 'development';

  if (isDev) {
    app.enableCors();
  }

  await app.listen(config.app.port);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './config';
import { CORS_ORIGIN_ALL } from './shared';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = app.get(ConfigService);
  const originArray = config.cors.origin.split(',');
  const origin = originArray.includes(CORS_ORIGIN_ALL) ? CORS_ORIGIN_ALL : originArray;

  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin });

  await app.listen(config.app.port);
}
bootstrap();

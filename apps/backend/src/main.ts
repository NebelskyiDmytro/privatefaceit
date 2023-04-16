import 'source-map-support';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT || 3000);
}
bootstrap();

process
  .on('unhandledRejection', (reason, promise) => console.error(reason, promise))
  .on('uncaughtException', (e) => console.log(e));

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WebhookModule } from './webhook/webhook.module';
import { FaceitModule } from './faceit/faceit.module';
import { SseModule } from './sse/sse.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend', 'dist'),
    }),
    WebhookModule,
    FaceitModule,
    SseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { FaceitModule } from 'src/faceit/faceit.module';
import { SseModule } from 'src/sse/sse.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService],
  imports: [FaceitModule, SseModule],
  exports: [WebhookService],
})
export class WebhookModule {}

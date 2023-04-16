import { Module } from '@nestjs/common';
import { SseController } from './sse.controller';
import { SseService } from './sse.service';

@Module({
  controllers: [SseController],
  exports: [SseService],
  providers: [SseService],
})
export class SseModule {}

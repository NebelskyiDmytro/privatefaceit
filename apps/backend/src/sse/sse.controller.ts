import { Controller, Sse } from '@nestjs/common';
import { SseService } from './sse.service';

@Controller('events')
export class SseController {
  constructor(private readonly sseService: SseService) {}

  @Sse()
  sse() {
    return this.sseService.sendEvents();
  }
}

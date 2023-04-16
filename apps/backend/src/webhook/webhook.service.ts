import { Injectable } from '@nestjs/common';
import { FaceitService } from 'src/faceit/faceit.service';
import { SseService } from 'src/sse/sse.service';

@Injectable()
export class WebhookService {
  constructor(private readonly faceitService: FaceitService, private readonly sseService: SseService) {}

  async processFinishedMatch(matchId: string, userId: string) {
    const data = await this.faceitService.getMatchWithStats(matchId, userId);

    this.sseService.addEvent({
      name: 'match_status_finished',
      data,
    });
  }
}

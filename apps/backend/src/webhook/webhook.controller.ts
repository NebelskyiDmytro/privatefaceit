import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { FaceitPayload } from '../typings/faceit';
import { WebhookService } from './webhook.service';
import got from 'got';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly service: WebhookService) {}

  @Get('')
  root() {
    return 'ok';
  }

  @Get('test')
  async test() {
    const userId = process.env.USERID || '79b3083a-347e-40f9-b62a-80c73262997a';
    const request = await got(`https://api.faceit.com/stats/api/v1/stats/time/users/${userId}/games/csgo?size=30`, {
      method: 'GET',
      responseType: 'json',
    });

    this.service.processFinishedMatch((request.body as any)[0].matchId, userId);
    return 'ok';
  }

  @Post('faceit')
  faceitPost(@Body() body: FaceitPayload, @Headers('userid') userId?: string) {
    console.dir({ faceitPost: 'faceitPost', body, userId }, { depth: null });
    this.service.processFinishedMatch(body.payload.id, userId);

    return 'ok';
  }
}

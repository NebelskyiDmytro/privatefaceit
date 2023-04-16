import { Injectable } from '@nestjs/common';
import { ApiPlayer } from 'src/typings/faceit';
import got, { ResponseType, Method, RequestError } from 'got';
import { setTimeout as waitMs } from 'timers/promises';

@Injectable()
export class FaceitService {
  private readonly apiKey = process.env.API_KEY || '1bc7358c-8415-4ff2-b2dc-1f7ea0b1d8ca';
  private apiUrl = 'https://open.faceit.com/data/v4';

  async getMatchWithStats(matchId: string, userId: string) {
    await waitMs(1000);
    const requestOptions = {
      responseType: 'json' as ResponseType,
      method: 'GET' as Method,
    };

    let match;
    let matchStats;
    let player;

    try {
      [match, matchStats, player] = await Promise.all([
        got(`https://api.faceit.com/match/v2/match/${matchId}`, requestOptions),
        got(`${this.apiUrl}/matches/${matchId}/stats`, {
          ...requestOptions,
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
        this.getPlayer(userId),
      ]);
    } catch (error) {
      if (error instanceof RequestError) {
        console.log(error.code, error.message, error.request.requestUrl, error.response.body);
      }
      await waitMs(1000);
      return await this.getMatchWithStats(matchId, userId);
    }

    const matchPlayerOldElo = (Object.values((match.body as any).payload.teams) as any[])
      .flatMap((t) => t.roster)
      .find((p) => p.id === userId).elo;

    const userTeam = (matchStats.body as any).rounds[0].teams.find((t) => t.players.some((p) => p.player_id === userId));
    const winnerTeam = (matchStats.body as any).rounds[0].round_stats.Winner;
    const playerStats = userTeam.players.find((p) => p.player_id === userId).player_stats;

    return {
      nickname: player.nickname,
      lvl: player.games.csgo.skill_level,
      elo: {
        current: player.games.csgo.faceit_elo,
        diff: (Number(player.games.csgo.faceit_elo) - Number(matchPlayerOldElo)).toString().replace('-', ''),
      },
      result: (userTeam.team_id === winnerTeam ? 'win' : 'lose') as 'win' | 'lose',
      stats: {
        kills: Number(playerStats.Kills),
        assists: Number(playerStats.Assists),
        deaths: Number(playerStats.Deaths),
        mvp: Number(playerStats.MVPs),
      },
    };
  }

  async getPlayer(id: string) {
    return (await this.getPlayers([id]))[0];
  }

  async getPlayers(playersIds: string[]) {
    const players = await Promise.all(
      playersIds.map((id) => {
        return got(`${this.apiUrl}/players/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
          responseType: 'json',
        });
      }),
    );

    const result: ApiPlayer[] = await Promise.all(players.map((r) => r.body as Promise<any>));
    return result;
  }
}

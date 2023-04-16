export type MatchPlayer = {
  id: string;
  nickname: string;
  avatar: string;
  game_id: string;
  game_name: string;
  game_skill_level: number;
  membership: string;
  anticheat_required: string;
};

export interface MatchTeam {
  id: string;
  name: string;
  type: string;
  avatar: string;
  leader_id: string;
  co_leader_id: string;
  roster: Array<MatchPlayer>;
}

export interface FaceitPayload {
  transaction_id: string;
  event: 'match_status_finished';
  event_id: string;
  third_party_id: string;
  app_id: string;
  /* '2021-09-24T08:11:43Z' */
  timestamp: string;
  retry_count: number;
  version: number;
  payload: {
    id: string;
    organizer_id: 'faceit';
    region: 'EU';
    game: 'csgo';
    version: number;
    /* {
      id: 'a3c75828-7f0f-4940-adb9-994b4b389070',
      name: 'CS:GO 5v5 PREMIUM',
      type: 'matchmaking'
    } */
    entity: {
      id: string;
      name: string;
      type: string;
    };
    teams: Array<MatchTeam>;
    /* created_at: '2021-09-24T07:31:37Z',
    updated_at: '2021-09-24T08:11:43Z',
    started_at: '2021-09-24T07:35:05Z',
    finished_at: '2021-09-24T08:11:43Z' */
    created_at: string;
    updated_at: string;
    started_at: string;
    finished_at: string;
  };
}

export type ApiPlayer = {
  avatar: string;
  country: string;
  cover_featured_image: string;
  cover_image: string;
  faceit_url: string;
  friends_ids: string[];
  games: {
    [key: string]: {
      faceit_elo: number;
      game_player_id: string;
      game_player_name: string;
      game_profile_id: string;
      region: string;
      regions: Record<string, unknown>;
      skill_level: number;
      skill_level_label: string;
    };
  };
  infractions: Record<string, unknown>;
  membership_type: string;
  memberships: string[];
  new_steam_id: string;
  nickname: string;
  platforms: Record<string, string>;
  player_id: string;
  settings: {
    language: string;
  };
  steam_id_64: string;
  steam_nickname: string;
};

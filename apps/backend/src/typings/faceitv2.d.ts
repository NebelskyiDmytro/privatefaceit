export type FaceitMatchV2Team = {
  id: string;
  type: string;
  name: string;
  leader: string;
  roster: Array<{
    id: string;
    nickname: string;
    gameId: string;
    gameName: string;
    memberships: string[];
    elo: number;
    gameSkillLevel: number;
    acReq: boolean;
    partyId: string;
  }>;
  stats: {
    winProbability: number;
    skillLevel: {
      average: number;
      range: {
        min: number;
        max: number;
      };
    };
    rating: number;
  };
  substituted: false;
  summaryResults: {
    winner: 'faction1' | 'faction2';
  };
};
export interface FaceitMatchV2 {
  payload: {
    teams: {
      faction1: FaceitMatchV2Team;
      faction2: FaceitMatchV2Team;
    };
  };
}

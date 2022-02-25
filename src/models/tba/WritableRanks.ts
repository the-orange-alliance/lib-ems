
export const DEFAULT_BREAKDOWNS = [
  "wins",
  "losses",
  "ties",
  "Ranking Score",
  "Auto",
  "End Game",
  "Teleop Cell + CPanel",
];


export interface WritableRankings {
  breakdowns: string[],
  rankings: WritableRank[]
}

export interface WritableRank {
  team_key: string,
  rank: number,
  wins: number,
  losses: number,
  ties: number,
  played: number,
  dqs: number
}
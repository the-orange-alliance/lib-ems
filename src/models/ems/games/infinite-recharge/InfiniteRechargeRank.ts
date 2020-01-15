import Ranking from "../../Ranking";
import Team from "../../Team";

export default class InfiniteRechargeRank extends Ranking {
  private _rankingPoints: number;
  private _rankingScore: number;
  private _autoPoints: number;
  private _endPoints: number;
  private _telePoints: number;

  constructor() {
    super();
    this._rankingPoints = 0;
    this._rankingScore = 0;
    this._autoPoints = 0;
    this._endPoints = 0;
    this._telePoints = 0;
  }

  public toJSON(): object {
    return {
      rank_key: this.rankKey,
      team_key: this.teamKey,
      rank: this.rank,
      rank_change: this.rankChange,
      played: this.played,
      wins: this.wins,
      losses: this.losses,
      ties: this.ties,
      ranking_points: this.rankingPoints,
      ranking_score: this.rankingScore,
      auto_points: this.autoPoints,
      end_points: this.endPoints,
      tele_points: this.telePoints,
      alliance_key: this.allianceKey,
      team: typeof this.team !== "undefined" ? this.team.toJSON() : undefined
    };
  }

  public fromJSON(json: any): InfiniteRechargeRank {
    const rank: InfiniteRechargeRank = new InfiniteRechargeRank();
    rank.rankKey = json.rank_key;
    rank.teamKey = json.team_key;
    rank.rank = json.rank;
    rank.rankChange = json.rank_change;
    rank.wins = json.wins;
    rank.losses = json.losses;
    rank.ties = json.ties;
    rank.played = json.played;
    rank.rankingPoints = json.ranking_points;
    rank.rankingScore = json.ranking_score;
    rank.autoPoints = json.auto_points;
    rank.endPoints = json.end_points;
    rank.telePoints = json.tele_points;
    try {
      rank.team = new Team().fromJSON(json);
    } catch {
      rank.team = undefined;
    }
    return rank;
  }

  get rankingPoints(): number {
    return this._rankingPoints;
  }

  set rankingPoints(value: number) {
    this._rankingPoints = value;
  }

  get rankingScore(): number {
    return this._rankingScore;
  }

  set rankingScore(value: number) {
    this._rankingScore = value;
  }

  get autoPoints(): number {
    return this._autoPoints;
  }

  set autoPoints(value: number) {
    this._autoPoints = value;
  }

  get endPoints(): number {
    return this._endPoints;
  }

  set endPoints(value: number) {
    this._endPoints = value;
  }

  get telePoints(): number {
    return this._telePoints;
  }

  set telePoints(value: number) {
    this._telePoints = value;
  }
}
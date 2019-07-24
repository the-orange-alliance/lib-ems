import Ranking from "../../Ranking";
import Team from "../../Team";

export default class OceanOpportunitiesRank extends Ranking {
  private _rankingPoints: number;
  private _totalPoints: number;
  private _coopertitionPoints: number;

  constructor() {
    super();
    this._rankingPoints = 0;
    this._totalPoints = 0;
    this._coopertitionPoints = 0;
  }

  public toJSON(): object {
    return {
      rank_key: this.rankKey,
      team_key: this.teamKey,
      rank: this.rank,
      rank_change: this.rankChange,
      played: this.played,
      ranking_points: this.rankingPoints,
      total_points: this.totalPoints,
      coopertition_points: this.coopertitionPoints,
      team: typeof this.team !== "undefined" ? this.team.toJSON() : undefined
    };
  }

  public fromJSON(json: any): OceanOpportunitiesRank {
    const rank: OceanOpportunitiesRank = new OceanOpportunitiesRank();
    rank.rankKey = json.rank_key;
    rank.teamKey = json.team_key;
    rank.rank = json.rank;
    rank.rankChange = json.rank_change;
    rank.played = json.played;
    rank.rankingPoints = json.ranking_points;
    rank.totalPoints = json.total_points;
    rank.coopertitionPoints = json.coopertition_points;
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

  get totalPoints(): number {
    return this._totalPoints;
  }

  set totalPoints(value: number) {
    this._totalPoints = value;
  }

  get coopertitionPoints(): number {
    return this._coopertitionPoints;
  }

  set coopertitionPoints(value: number) {
    this._coopertitionPoints = value;
  }
}
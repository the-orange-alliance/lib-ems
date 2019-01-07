import Ranking from "../../Ranking";

export default class DeepSpaceRanking extends Ranking {
  private _rankingPoints: number;
  private _rankingScore: number;
  private _cargoPoints: number;
  private _hatchPanelPoints: number;
  private _habClimbPoints: number;
  private _sandstormBonusPoints: number;

  constructor() {
    super();
    this._rankingPoints = 0;
    this._rankingScore = 0;
    this._cargoPoints = 0;
    this._hatchPanelPoints = 0;
    this._habClimbPoints = 0;
    this._sandstormBonusPoints = 0;
  }

  public toJSON(): object {
    return {
      rank_key: this.rankKey,
      team_key: this.teamKey,
      rank: this.rank,
      rank_change: this.rankChange,
      played: this.played,
      ranking_points: this.rankingPoints,
      ranking_score: this.rankingScore,
      cargo_points: this.cargoPoints,
      hatch_panel_points: this.hatchPanelPoints,
      hab_climb_points: this.habClimbPoints,
      sandstorm_bonus_points: this.sandstormBonusPoints
    };
  }

  public fromJSON(json: any): DeepSpaceRanking {
    const rank: DeepSpaceRanking = new DeepSpaceRanking();
    rank.rankKey = json.rank_key;
    rank.teamKey = json.team_key;
    rank.rank = json.rank;
    rank.rankChange = json.rank_change;
    rank.played = json.played;
    rank.rankingPoints = json.ranking_points;
    rank.rankingScore = json.ranking_score;
    rank.cargoPoints = json.cargo_points;
    rank.hatchPanelPoints = json.hatch_panel_points;
    rank.habClimbPoints = json.hab_climb_points;
    rank.sandstormBonusPoints = json.sandstorm_bonus_points;
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

  get cargoPoints(): number {
    return this._cargoPoints;
  }

  set cargoPoints(value: number) {
    this._cargoPoints = value;
  }

  get hatchPanelPoints(): number {
    return this._hatchPanelPoints;
  }

  set hatchPanelPoints(value: number) {
    this._hatchPanelPoints = value;
  }

  get habClimbPoints(): number {
    return this._habClimbPoints;
  }

  set habClimbPoints(value: number) {
    this._habClimbPoints = value;
  }

  get sandstormBonusPoints(): number {
    return this._sandstormBonusPoints;
  }

  set sandstormBonusPoints(value: number) {
    this._sandstormBonusPoints = value;
  }
}
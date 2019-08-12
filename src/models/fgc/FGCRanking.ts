import IPostableObject from "../IPostableObject";

export default class FGCRanking implements IPostableObject {
  private _rankingKey: string;
  private _teamKey: number;
  private _allianceKey: string;
  private _tournamentLevel: number;
  private _rank: number;
  private _rankChange: number;
  private _played: number;
  private _wins: number;
  private _losses: number;
  private _ties: number;
  private _rankingPoints: number;
  private _totalPoints: number;
  private _coopertitionBonuses: number;

  constructor() {
    this._rankingKey = "";
    this._teamKey = -1;
    this._allianceKey = "";
    this._tournamentLevel = -1;
    this._rank = 0;
    this._rankChange = 0;
    this._played = 0;
    this._wins = 0;
    this._losses = 0;
    this._ties = 0;
    this._rankingPoints = 0;
    this._totalPoints = 0;
    this._coopertitionBonuses = 0;
  }

  public toJSON(): object {
    return {
      RankingKey: this.rankingKey,
      TeamKey: this.teamKey,
      AllianceKey: this.allianceKey,
      TournamentLevel: this.tournamentLevel,
      Rank: this.rank,
      RankChange: this.rankChange,
      Played: this.played,
      Wins: this.wins,
      Losses: this.losses,
      Ties: this.ties,
      RankingPoints: this.rankingPoints,
      TotalPoints: this.totalPoints,
      CoopertitionBonuses: this.coopertitionBonuses
    };
  }

  public fromJSON(json: any): FGCRanking {
    const ranking: FGCRanking = new FGCRanking();
    ranking.rankingKey = json.RankingKey;
    ranking.teamKey = json.TeamKey;
    ranking.allianceKey = json.AllianceKey;
    ranking.tournamentLevel = json.TournamentLevel;
    ranking.rank = json.Rank;
    ranking.rankChange = json.RankChange;
    ranking.played = json.Played;
    ranking.wins = json.Wins;
    ranking.losses = json.Losses;
    ranking.ties = json.Ties;
    ranking.rankingPoints = json.RankingPoints;
    ranking.totalPoints = json.TotalPoints;
    ranking.coopertitionBonuses = json.CoopertitionBonuses;
    return ranking;
  }

  get rankingKey(): string {
    return this._rankingKey;
  }

  set rankingKey(value: string) {
    this._rankingKey = value;
  }

  get teamKey(): number {
    return this._teamKey;
  }

  set teamKey(value: number) {
    this._teamKey = value;
  }

  get allianceKey(): string {
    return this._allianceKey;
  }

  set allianceKey(value: string) {
    this._allianceKey = value;
  }

  get tournamentLevel(): number {
    return this._tournamentLevel;
  }

  set tournamentLevel(value: number) {
    this._tournamentLevel = value;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }

  get rankChange(): number {
    return this._rankChange;
  }

  set rankChange(value: number) {
    this._rankChange = value;
  }

  get played(): number {
    return this._played;
  }

  set played(value: number) {
    this._played = value;
  }

  get wins(): number {
    return this._wins;
  }

  set wins(value: number) {
    this._wins = value;
  }

  get losses(): number {
    return this._losses;
  }

  set losses(value: number) {
    this._losses = value;
  }

  get ties(): number {
    return this._ties;
  }

  set ties(value: number) {
    this._ties = value;
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

  get coopertitionBonuses(): number {
    return this._coopertitionBonuses;
  }

  set coopertitionBonuses(value: number) {
    this._coopertitionBonuses = value;
  }
}
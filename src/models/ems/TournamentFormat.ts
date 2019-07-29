import IPostableObject from "../IPostableObject";
import {PlayoffsType, SeriesType} from "../../Types";

export class TournamentFormat implements IPostableObject {
  private _type: PlayoffsType;
  private _teamsPerAlliance: number;

  constructor(type: PlayoffsType) {
    this._type = type;
    this._teamsPerAlliance = 2;
  }

  public toJSON(): object {
    return {
      type: this.type,
      teams_per_alliance: this.teamsPerAlliance
    };
  }

  public fromJSON(json: any): TournamentFormat {
    const format: TournamentFormat = new TournamentFormat(json.type);
    format.teamsPerAlliance = json.teams_per_alliance;
    return format;
  }

  get type(): PlayoffsType {
    return this._type;
  }

  set type(value: PlayoffsType) {
    this._type = value;
  }

  get teamsPerAlliance(): number {
    return this._teamsPerAlliance;
  }

  set teamsPerAlliance(value: number) {
    this._teamsPerAlliance = value;
  }
}

export class RoundRobinFormat extends TournamentFormat {
  private _alliances: number;

  constructor() {
    super("rr");
    this._alliances = 8;
  }

  public toJSON(): object {
    return {
      type: this.type,
      teams_per_alliance: this.teamsPerAlliance,
      alliances: this.alliances
    };
  }

  public fromJSON(json: any): RoundRobinFormat {
    const format: RoundRobinFormat = new RoundRobinFormat();
    format.teamsPerAlliance = json.teams_per_alliance;
    format.alliances = json.alliances;
    return format;
  }

  get alliances(): number {
    return this._alliances;
  }

  set alliances(value: number) {
    this._alliances = value;
  }
}

export class RankingMatchesFormat extends TournamentFormat {
  private _rankingCutoff: number;

  constructor() {
    super("ranking");
    this._rankingCutoff = 32;
  }

  public toJSON(): object {
    return {
      type: this.type,
      teams_per_alliance: this.teamsPerAlliance,
      ranking_cutoff: this.rankingCutoff
    };
  }

  public fromJSON(json: any): RankingMatchesFormat {
    const format: RankingMatchesFormat = new RankingMatchesFormat();
    format.teamsPerAlliance = json.teams_per_alliance;
    format.rankingCutoff = json.ranking_cutoff;
    return format;
  }

  get rankingCutoff(): number {
    return this._rankingCutoff;
  }

  set rankingCutoff(value: number) {
    this._rankingCutoff = value;
  }
}

export class EliminationMatchesFormat extends TournamentFormat {
  private _alliances: number;
  private _seriesType: SeriesType;

  constructor() {
    super("elims");
    this._alliances = 4;
    this._seriesType = "bo3";
  }

  public toJSON(): object {
    return {
      type: this.type,
      teams_per_alliance: this.teamsPerAlliance,
      alliances: this.alliances,
      series_type: this.seriesType
    };
  }

  public fromJSON(json: any): EliminationMatchesFormat {
    const format: EliminationMatchesFormat = new EliminationMatchesFormat();
    format.teamsPerAlliance = json.teams_per_alliance;
    format.alliances = json.alliances;
    format.seriesType = json.series_type;
    return format;
  }

  get alliances(): number {
    return this._alliances;
  }

  set alliances(value: number) {
    this._alliances = value;
  }

  get seriesType(): SeriesType {
    return this._seriesType;
  }

  set seriesType(value: SeriesType) {
    this._seriesType = value;
  }
}
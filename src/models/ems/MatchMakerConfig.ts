import {TournamentType} from "../../Types";

import IPostableObject from "../IPostableObject";

export default class MatchMakerConfig implements IPostableObject {
  private _teams: number;
  private _rounds: number;
  private _quality: string;
  private _teamsPerAlliance: number;
  private _fields: number;
  private _eventKey: string;
  private _type: TournamentType;

  constructor() {
    this._teams = -1;
    this._rounds = -1;
    this._quality = "";
    this._teamsPerAlliance = -1;
    this._fields = 1;
    this._eventKey = "";
    this._type = "Test";
  }

  public toJSON(): object {
    return {
      teams: this.teams,
      rounds: this.rounds,
      quality: this.quality,
      teams_per_alliance: this.teamsPerAlliance,
      fields: this.fields,
      event_key: this.eventKey,
      type: this.type,
    }
  }

  public fromJSON(json: any): MatchMakerConfig {
    const mmc = new MatchMakerConfig();
    mmc.teams = json.teams;
    mmc.rounds = json.rounds;
    mmc.quality = json.quality;
    mmc.teamsPerAlliance = json.teams_per_alliance;
    mmc.fields = json.fields;
    mmc.eventKey = json.event_key;
    mmc.type = json.type;
    return mmc;
  }

  get teams(): number {
    return this._teams;
  }

  set teams(value: number) {
    this._teams = value;
  }

  get rounds(): number {
    return this._rounds;
  }

  set rounds(value: number) {
    this._rounds = value;
  }

  get quality(): string {
    return this._quality;
  }

  set quality(value: string) {
    this._quality = value;
  }

  get teamsPerAlliance(): number {
    return this._teamsPerAlliance;
  }

  set teamsPerAlliance(value: number) {
    this._teamsPerAlliance = value;
  }

  get fields(): number {
    return this._fields;
  }

  set fields(value: number) {
    this._fields = value;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get type(): TournamentType {
    return this._type;
  }

  set type(value: TournamentType) {
    this._type = value;
  }
}
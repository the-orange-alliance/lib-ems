import IPostableObject from "../IPostableObject";
import {AdvancementType, EventType, TeamIdentifier} from "../../Types";
import TournamentRound, {ELIMINATIONS_PRESET, RANKING_PRESET} from "./TournamentRound";

export default class EventConfiguration implements IPostableObject {
  private _eventType: EventType;
  private _teamIdentifier: TeamIdentifier;
  private _requiresTOA: boolean;
  private _teamsPerAlliance: number;

  // Tournament Advancement Fields
  private _advancementConfig: AdvancementType;
  private _advancementRounds: TournamentRound[];

  // Variables that aren't necessary in standard mode
  private _fieldsControlled: number[];

  constructor() {
    this._requiresTOA = false;
    this._teamsPerAlliance = 0;

    this._advancementConfig = "elims";
    this._advancementRounds = [new TournamentRound()];

    this._fieldsControlled = [];
  }

  public toJSON(): object {
    return {
      event_type: this.eventType,
      team_identifier: this.teamIdentifier,
      requires_toa: this.requiresTOA,
      teams_per_alliance: this.teamsPerAlliance,
      advancement_config: this.advancementConfig,
      advancement_rounds: this.advancementRounds.map((r: TournamentRound) => r.toJSON()),
      fields_controlled: this.fieldsControlled,
    };
  }

  public fromJSON(json: any): EventConfiguration {
    const config: EventConfiguration = new EventConfiguration();
    config.eventType = json.event_type;
    config.teamIdentifier = json.team_identifier;
    config.requiresTOA = json.requires_toa;
    config.teamsPerAlliance = json.teams_per_alliance;
    try {
      config.advancementConfig = json.advancement_config;
      config.advancementRounds = json.advancement_rounds.map((rJSON: any) => new TournamentRound().fromJSON(rJSON));
    } catch {
      config.advancementConfig = "elims";
      config.advancementRounds = [ELIMINATIONS_PRESET];
    }
    config.fieldsControlled = json.fields_controlled;
    return config;
  }

  get eventType(): EventType {
    return this._eventType;
  }

  set eventType(value: EventType) {
    this._eventType = value;
  }


  get teamIdentifier(): TeamIdentifier {
    return this._teamIdentifier;
  }

  set teamIdentifier(value: TeamIdentifier) {
    this._teamIdentifier = value;
  }

  get requiresTOA(): boolean {
    return this._requiresTOA;
  }

  set requiresTOA(value: boolean) {
    this._requiresTOA = value;
  }

  get teamsPerAlliance(): number {
    return this._teamsPerAlliance;
  }

  set teamsPerAlliance(value: number) {
    this._teamsPerAlliance = value;
  }

  get advancementConfig(): AdvancementType {
    return this._advancementConfig;
  }

  set advancementConfig(value: AdvancementType) {
    this._advancementConfig = value;
  }

  get advancementRounds(): TournamentRound[] {
    return this._advancementRounds;
  }

  set advancementRounds(value: TournamentRound[]) {
    this._advancementRounds = value;
  }

  get fieldsControlled(): number[] {
    return this._fieldsControlled;
  }

  set fieldsControlled(value: number[]) {
    this._fieldsControlled = value;
  }
}

export const FGC_PRESET = new EventConfiguration();
FGC_PRESET.eventType = "fgc_2019";
FGC_PRESET.teamIdentifier = "country";
FGC_PRESET.requiresTOA = false;
FGC_PRESET.teamsPerAlliance = 3;
FGC_PRESET.advancementConfig = "ranking";
FGC_PRESET.advancementRounds = [RANKING_PRESET];

export const FTC_RELIC_PRESET = new EventConfiguration();
FTC_RELIC_PRESET.eventType = "ftc_1718";
FTC_RELIC_PRESET.teamIdentifier = "team_key";
FTC_RELIC_PRESET.requiresTOA = true;
FTC_RELIC_PRESET.teamsPerAlliance = 2;
FTC_RELIC_PRESET.advancementConfig = "elims";
FTC_RELIC_PRESET.advancementRounds = [ELIMINATIONS_PRESET];

export const FTC_ROVER_PRESET = new EventConfiguration();
FTC_ROVER_PRESET.eventType = "ftc_1819";
FTC_ROVER_PRESET.teamIdentifier = "team_key";
FTC_ROVER_PRESET.requiresTOA = true;
FTC_ROVER_PRESET.teamsPerAlliance = 2;
FTC_ROVER_PRESET.advancementConfig = "elims";
FTC_ROVER_PRESET.advancementRounds = [ELIMINATIONS_PRESET];

export const DEFAULT_RESET = new EventConfiguration();
DEFAULT_RESET.eventType = "ftc_1819";
DEFAULT_RESET.teamIdentifier = "team_key";
DEFAULT_RESET.requiresTOA = true;
DEFAULT_RESET.teamsPerAlliance = 2;
DEFAULT_RESET.advancementConfig = "elims";
DEFAULT_RESET.advancementRounds = [ELIMINATIONS_PRESET];

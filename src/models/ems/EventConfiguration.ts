import IPostableObject from "../IPostableObject";
import {AdvancementType, EventType, TeamIdentifier} from "../../Types";
import TournamentRound, {ELIMINATIONS_PRESET, RANKING_PRESET} from "./TournamentRound";

export default class EventConfiguration implements IPostableObject {
  private _eventType: EventType;
  private _teamIdentifier: TeamIdentifier;
  private _requiresTOA: boolean;
  private _teamsPerAlliance: number;

  // Tournament Advancement Fields
  private _tournamentConfig: AdvancementType;
  private _tournament: TournamentRound | TournamentRound[];
  private _activeTournamentID: number;

  // Variables that aren't necessary in standard mode
  private _fieldsControlled: number[];

  constructor() {
    this._requiresTOA = false;
    this._teamsPerAlliance = 0;

    this._tournamentConfig = "elims";
    this._tournament = new TournamentRound();
    this._activeTournamentID = -1;

    this._fieldsControlled = [];
  }

  public toJSON(): object {
    return {
      event_type: this.eventType,
      team_identifier: this.teamIdentifier,
      requires_toa: this.requiresTOA,
      teams_per_alliance: this.teamsPerAlliance,
      tournament_config: this.tournamentConfig,
      tournament: Array.isArray(this.tournament) ? this.tournament.map((r: TournamentRound) => r.toJSON()) : this.tournament.toJSON(),
      active_tournament_id: this.activeTournamentID,
      fields_controlled: this.fieldsControlled,
    };
  }

  public fromJSON(json: any): EventConfiguration {
    const config: EventConfiguration = new EventConfiguration();
    config.eventType = json.event_type;
    config.teamIdentifier = json.team_identifier;
    config.requiresTOA = json.requires_toa;
    config.teamsPerAlliance = json.teams_per_alliance;
    config._activeTournamentID = json.active_tournament_id;
    try {
      config.tournamentConfig = json.tournament_config;
      if (Array.isArray(json.tournament)) {
        config.tournament = json.tournament.map((rJSON: any) => new TournamentRound().fromJSON(rJSON));
      } else {
        config.tournament = new TournamentRound().fromJSON(json.tournament);
      }
    } catch {
      config.tournamentConfig = "elims";
      config.tournament = ELIMINATIONS_PRESET;
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

  get tournamentConfig(): AdvancementType {
    return this._tournamentConfig;
  }

  set tournamentConfig(value: AdvancementType) {
    this._tournamentConfig = value;
  }

  get tournament(): TournamentRound | TournamentRound[] {
    return this._tournament;
  }

  set tournament(value: TournamentRound | TournamentRound[]) {
    this._tournament = value;
  }

  get activeTournamentID(): number {
    return this._activeTournamentID;
  }

  set activeTournamentID(value: number) {
    this._activeTournamentID = value;
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
FGC_PRESET.tournamentConfig = "ranking";
FGC_PRESET.tournament = RANKING_PRESET;

export const FTC_RELIC_PRESET = new EventConfiguration();
FTC_RELIC_PRESET.eventType = "ftc_1718";
FTC_RELIC_PRESET.teamIdentifier = "team_key";
FTC_RELIC_PRESET.requiresTOA = true;
FTC_RELIC_PRESET.teamsPerAlliance = 2;
FTC_RELIC_PRESET.tournamentConfig = "elims";
FTC_RELIC_PRESET.tournament = ELIMINATIONS_PRESET;

export const FTC_ROVER_PRESET = new EventConfiguration();
FTC_ROVER_PRESET.eventType = "ftc_1819";
FTC_ROVER_PRESET.teamIdentifier = "team_key";
FTC_ROVER_PRESET.requiresTOA = true;
FTC_ROVER_PRESET.teamsPerAlliance = 2;
FTC_ROVER_PRESET.tournamentConfig = "elims";
FTC_ROVER_PRESET.tournament = [ELIMINATIONS_PRESET];

export const DEFAULT_RESET = new EventConfiguration();
DEFAULT_RESET.eventType = "ftc_1819";
DEFAULT_RESET.teamIdentifier = "team_key";
DEFAULT_RESET.requiresTOA = true;
DEFAULT_RESET.teamsPerAlliance = 2;
DEFAULT_RESET.tournamentConfig = "elims";
DEFAULT_RESET.tournament = [ELIMINATIONS_PRESET];

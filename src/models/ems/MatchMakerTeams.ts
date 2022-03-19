import IPostableObject from "../IPostableObject";
import {TournamentType} from "../../Types";

export default class MatchMakerTeams implements IPostableObject {
  private _tournamentType: TournamentType;
  private _teams: number[];

  constructor() {
    this._tournamentType = "Test";
    this._teams = []
  }

  public toJSON(): object {
    return {
      tournament_type: this.tournamentType,
      teams: this.teams
    }
  }

  public fromJSON(json: any): MatchMakerTeams {
    const t = new MatchMakerTeams();
    t.tournamentType = json.tournament_type;
    t.teams = json.teams;
    return t;
  }

  get tournamentType(): TournamentType {
    return this._tournamentType;
  }

  set tournamentType(value: TournamentType) {
    this._tournamentType = value;
  }

  get teams(): number[] {
    return this._teams;
  }

  set teams(value: number[]) {
    this._teams = value;
  }
}
import IPostableObject from "../IPostableObject";
import {EliminationMatchesFormat, RankingMatchesFormat, RoundRobinFormat, TournamentFormat} from "./TournamentFormat";
import {PlayoffsType} from "../../Types";

export default class TournamentRound implements IPostableObject {
  private _id: number;
  private _format: TournamentFormat;

  constructor() {
    this._id = -1;
    this._format = new EliminationMatchesFormat();
  }

  public toJSON() {
    return {
      id: this.id,
      type: this.type,
      format: this.format.toJSON()
    };
  }

  public fromJSON(json: any): TournamentRound {
    const round: TournamentRound = new TournamentRound();
    round.id = json.id;
    try {
      switch (json.type) {
        case "rr":
          round.format = new RoundRobinFormat().fromJSON(json.format);
          break;
        case "ranking":
          round.format = new RankingMatchesFormat().fromJSON(json.format);
          break;
        case "elims":
          round.format = new EliminationMatchesFormat().fromJSON(json.format);
          break;
      }
    } catch {
      throw "Could not convert type to tournament format.";
    }
    return round;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get type(): PlayoffsType {
    return this._format.type;
  }

  get format(): TournamentFormat {
    return this._format;
  }

  set format(value: TournamentFormat) {
    this._format = value;
  }
}

export const ROUND_ROBIN_PRESET = new TournamentRound();
ROUND_ROBIN_PRESET.id = 0;
ROUND_ROBIN_PRESET.format = new RoundRobinFormat();

export const RANKING_PRESET = new TournamentRound();
RANKING_PRESET.id = 0;
RANKING_PRESET.format = new RankingMatchesFormat();

export const ELIMINATIONS_PRESET = new TournamentRound();
ELIMINATIONS_PRESET.id = 0;
ELIMINATIONS_PRESET.format = new EliminationMatchesFormat();
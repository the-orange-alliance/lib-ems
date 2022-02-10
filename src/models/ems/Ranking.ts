import IPostableObject from "../IPostableObject";
import Team from "./Team";
import {EnergyImpactRanking, InfiniteRechargeRank, OceanOpportunitiesRank, RoverRuckusRank, RapidReactRank} from "./";
import {EventType} from "../../Types";

export default class Ranking implements IPostableObject {
  private _rankKey: string;
  private _teamKey: number;
  private _rank: number;
  private _rankChange: number;
  private _played: number;
  private _wins: number;
  private _losses: number;
  private _ties: number;
  private _allianceKey: string;

  // This item is separate, and not recorded directly in the 'Ranking' table.
  private _team: Team;

  constructor() {
    this._rankKey = "";
    this._teamKey = 0;
    this._rank = 0;
    this._rankChange = 0;
    this._played = 0;
    this._wins = 0;
    this._losses = 0;
    this._ties = 0;
    this._allianceKey = "";
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
      alliance_key: this.allianceKey,
      team: typeof this.team !== "undefined" ? this.team.toJSON() : undefined
    };
  }

  public fromJSON(json: any): Ranking {
    const ranking: Ranking = new Ranking();
    ranking.rankKey = json.rank_key;
    ranking.teamKey = json.team_key;
    ranking.rank = json.rank;
    ranking.rankChange = json.rank_change;
    ranking.played = json.played;
    ranking.wins = json.wins;
    ranking.losses = json.losses;
    ranking.ties = json.ties;
    ranking.allianceKey = json.alliance_key;
    try {
      ranking.team = new Team().fromJSON(json);
    } catch {
      ranking.team = undefined;
    }
    return ranking;
  }

  get rankKey(): string {
    return this._rankKey;
  }

  set rankKey(value: string) {
    this._rankKey = value;
  }

  get teamKey(): number {
    return this._teamKey;
  }

  set teamKey(value: number) {
    this._teamKey = value;
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

  get allianceKey(): string {
    return this._allianceKey;
  }

  set allianceKey(value: string) {
    this._allianceKey = value;
  }

  get team(): Team {
    return this._team;
  }

  set team(value: Team) {
    this._team = value;
  }
}

export function getRankingByEventType(eventType?: EventType): Ranking {
  switch (eventType) {
    case "fgc_2018":
      return new EnergyImpactRanking();
    case "fgc_2019":
      return new OceanOpportunitiesRank();
    case "ftc_1819":
      return new RoverRuckusRank();
    case "frc_20":
      return new InfiniteRechargeRank();
    case "frc_22":
      return new RapidReactRank();
    default:
      return new Ranking();
  }
}

export function getRankingBySeasonKey(seasonKey: string): Ranking {
  switch (seasonKey) {
    case "2018":
      return new EnergyImpactRanking();
    case "2019":
      return new OceanOpportunitiesRank();
    case "1819":
      return new RoverRuckusRank();
    case "20":
      return new InfiniteRechargeRank();
    case "22":
      return new RapidReactRank();
    default:
      return new Ranking();
  }
}

import Schedule from "./Schedule";
import Day from "./Day";

export default class RoundRobinSchedule extends Schedule {
  private _alliances: number;
  private _roundBreakTime: number;

  constructor() {
    super("Round Robin");
  }

  public toJSON(): object {
    return {
      allianceS: this.alliances,
      type: this.type,
      matchConcurrency: this.matchConcurrency,
      teamsParticipating: this.teamsParticipating,
      matchesPerTeam: this.matchesPerTeam,
      totalMatches: this.totalMatches,
      cycleTime: this.cycleTime,
      teams: this.teams,
      days: this.days.map(day => day.toJSON())
    };
  }

  public fromJSON(json: any): RoundRobinSchedule {
    const schedule: RoundRobinSchedule = new RoundRobinSchedule();
    schedule.alliances = json.alliances;
    schedule.matchConcurrency = json.matchConcurrency;
    schedule.teamsParticipating = json.teamsParticipating;
    schedule.matchesPerTeam = json.matchesPerTeam;
    schedule.totalMatches = json.totalMatches;
    schedule.cycleTime = json.cycleTime;
    schedule.teams = json.teams;
    schedule.days = json.days.map((day: any) => new Day().fromJSON(day));
    return schedule;
  }

  get maxTotalRounds(): number {
    return this.alliances - 1;
  }

  get maxTotalMatches(): number {
    return (this.alliances / 2) * (this.alliances - 1);
  }

  get maxMatchesPerRound(): number {
    return this.maxTotalMatches / this.maxTotalRounds;
  }

  get alliances(): number {
    return this._alliances;
  }

  set alliances(value: number) {
    this._alliances = value;
  }

  get roundBreakTime(): number {
    return this._roundBreakTime;
  }

  set roundBreakTime(value: number) {
    this._roundBreakTime = value;
  }
}
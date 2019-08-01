import Schedule from "./Schedule";
import Day from "./Day";
import ScheduleItem from "./ScheduleItem";
import DayBreak from "./DayBreak";
import * as moment from "moment";
import Event from "./Event";

export default class RoundRobinSchedule extends Schedule {
  private _alliances: number;
  private _roundBreakTime: number;
  private _roundBreaks: DayBreak[];

  constructor() {
    super("Round Robin");
    this._roundBreakTime = 0;
    this._roundBreaks = [];
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

  public generateSchedule(event: Event): ScheduleItem[] {

    const items: ScheduleItem[] = super.generateSchedule(event);
    let i = 0;
    let roundIndex = 1;
    for (const item of items) {
      if (item.isMatch) {
        i++;
        const matchNumber: number = i % this.maxMatchesPerRound === 0 ? 4 : i % this.maxMatchesPerRound;
        item.name = `Round ${roundIndex} Match ${matchNumber}`;
        if (i % this.maxMatchesPerRound === 0) {
          roundIndex++;
        }
      }
    }
    return items;
  }

  private handleBreaks() {
    this._roundBreaks = [];
    if (this.roundBreakTime > 0) {
      for (let i = 0; i < this.maxTotalRounds - 1; i++) {
        const roundBreak: DayBreak = new DayBreak();
        if (this.days.length > 1) {
          // TODO
        } else {
          roundBreak.id = this.days[0].breaks.length + 1;
          roundBreak.name = `Round ${i+1} Break`;
          roundBreak.duration = this.roundBreakTime;
          roundBreak.match = this.maxMatchesPerRound * (i + 1);
          roundBreak.startTime = moment(this.days[0].startTime).add(roundBreak.match * this.cycleTime, "minutes");
          this._roundBreaks.push(roundBreak);
        }
      }
    }
    if (this.days.length > 1) {
      // TODO
    } else {
      this.days[0].breaks = [];
    }
    for (const roundBreak of this._roundBreaks) {
      const breakIndex: number = this.days.length + 1;
      if (this.days.length > 1) {
        // TODO
      } else {
        this.days[0].addBreak();
        this.days[0].breaks[breakIndex] = roundBreak;
      }
    }
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
    this.handleBreaks();
  }
}
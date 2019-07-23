import IPostableObject from "../models/IPostableObject";
import {default as Axios, AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse} from "axios";
import {
  AllianceMember, Event, getRankingByEventType, HttpError, Match, MatchDetails, MatchParticipant, Ranking, ScheduleItem,
  Team
} from "../models/ems";
import {EventType, TournamentType} from "../Types";

const PORT = process.env.REACT_APP_EMS_API_PORT;

class EMSProvider {
  private static _instance: EMSProvider;

  private _axios: AxiosInstance;
  private _config: AxiosRequestConfig;
  private _host: string;

  public static getInstance(): EMSProvider {
    if (typeof EMSProvider._instance === "undefined") {
      EMSProvider._instance = new EMSProvider();
    }
    return EMSProvider._instance;
  }

  private constructor() {}

  /**
   * This method must be called before retrieving data. Since this class implements the singleton design
   * and the network of EMS may change, the provider must be manually initialized at runtime.
   */
  public initialize(host: string, port?: number): void {
    this._host = "http://" + host + ":" + (port ? port : PORT) + "/";
    this._config = {
      baseURL: this._host,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json"
      }
    };
    this._axios = Axios.create(this._config);
  }

  private get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof this._axios === "undefined" || typeof this._host === "undefined") {
        reject(new HttpError(500, "ERR_PROVIDER_UNDEFINED", "The provider's host address has not been initialized."));
      }
      this._axios.get(url, {data: {}}).then((response: AxiosResponse) => {
        if (typeof response.data !== "undefined") {
          if (typeof response.data.payload !== "undefined") {
            resolve(response.data.payload);
          } else {
            resolve(response.data);
          }
        } else {
          reject(new HttpError(500, "ERR_NO_DATA", this._host + url));
        }
      }).catch((error: AxiosError) => {
        if (error.response) {
          reject(new HttpError(error.response.data._code, error.response.data._message, this._host + url));
        } else if (error.request) {
          reject(new HttpError(404, "ERR_CONNECTION_REFUSED", this._host + url));
        } else {
          reject(new HttpError(404, error.message, this._host + url));
        }
      });
    });
  }

  private delete(url: string): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      if (typeof this._axios === "undefined" || typeof this._host === "undefined") {
        reject(new HttpError(500, "ERR_PROVIDER_UNDEFINED", "The provider's host address has not been initialized."));
      }
      this._axios.delete(url, {data: {}}).then((response: AxiosResponse) => {
        if (typeof response.data !== "undefined") {
          resolve(response.data.payload);
        } else {
          reject(new HttpError(500, "ERR_NO_DATA", this._host + url));
        }
      }).catch((error: AxiosError) => {
        if (error.response) {
          reject(new HttpError(error.response.data._code, error.response.data._message, this._host + url));
        } else if (error.request) {
          reject(new HttpError(404, "ERR_CONNECTION_REFUSED", this._host + url));
        } else {
          reject(new HttpError(404, error.message, this._host + url));
        }
      });
    });
  }

  public post(url: string, body: IPostableObject | IPostableObject[]): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      const records: object[] = [];
      if (body instanceof Array) {
        for (const record of body) {
          records.push(record.toJSON());
        }
      } else {
        records.push(body.toJSON());
      }
      this._axios.post(url, {records: records}).then((response: AxiosResponse) => {
        resolve(response);
      }).catch((error) => {
        if (error.response) {
          reject(new HttpError(error.response.data._code, error.response.data._message, this._host + url));
        } else if (error.request) {
          reject(new HttpError(404, "ERR_CONNECTION_REFUSED", this._host + url));
        } else {
          reject(new HttpError(404, error.message, this._host + url));
        }
      });
    });
  }

  public put(url: string, body: IPostableObject | IPostableObject[]): Promise<AxiosResponse> {
    return new Promise((resolve, reject) => {
      const records: object[] = [];
      if (body instanceof Array) {
        for (const record of body) {
          records.push(record.toJSON());
        }
      } else {
        records.push(body.toJSON());
      }
      this._axios.put(url, {records: records}).then((response: AxiosResponse) => {
        resolve(response);
      }).catch((error) => {
        if (error.response) {
          reject(new HttpError(error.response.data._code, error.response.data._message, this._host + url));
        } else if (error.request) {
          reject(new HttpError(404, "ERR_CONNECTION_REFUSED", this._host + url));
        } else {
          reject(new HttpError(404, error.message, this._host + url));
        }
      });
    });
  }

  public ping(timeout?: number): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.get("ping").then((res: any) => {
        resolve(res.res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public createEvent(eventType: EventType): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.get("api/event/create?type=" + eventType).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public deleteEvent(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.delete("api/event/delete").then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getEvent(): Promise<Event[]> {
    return new Promise<Event[]>((resolve, reject) => {
      this.get("api/event").then((res: any) => {
        resolve(res.map((eventJSON: any) => new Event().fromJSON(eventJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getTeams(): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      this.get("api/team").then((res: any) => {
        resolve(res.map((teamJSON: any) => new Team().fromJSON(teamJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getScheduleItems(type: TournamentType): Promise<ScheduleItem[]> {
    return new Promise<ScheduleItem[]>((resolve, reject) => {
      this.get("api/schedule/" + type).then((res: any) => {
        resolve(res.map((scheduleItemJSON: any) => new ScheduleItem(type).fromJSON(scheduleItemJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatchesAndParticipants(matchKeyPrtial: string): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      this.get("api/match?match_key_partial=" + matchKeyPrtial).then((res: any) => {
        const matches: Match[] = [];
        for (const matchJSON of res) {
          const match: Match = new Match().fromJSON(matchJSON);
          if (typeof matchJSON.participants !== "undefined") {
            match.participants = matchJSON.participants.map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON));
          }
          matches.push(match);
        }
        resolve(matches);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getRankings(eventType?: EventType): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      this.get("api/ranking").then((res: any) => {
        resolve(res.map((rankingJSON: any) => getRankingByEventType(eventType).fromJSON(rankingJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getRankingTeams(eventType?: EventType): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      this.get("api/ranking/teams").then((res: any) => {
        const rankings: Ranking[] = [];
        for (const rankJSON of res) {
          const rank: Ranking = getRankingByEventType(eventType).fromJSON(rankJSON);
          rank.team = new Team().fromJSON(rankJSON);
        }
        resolve(rankings);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatch(matchKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.get("api/match/" + matchKey).then((res: any) => {
        resolve(res.map((matchJSON: any) => new Match().fromJSON(matchJSON))[0]);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatchParticipants(matchKey: string): Promise<MatchParticipant[]> {
    return new Promise<MatchParticipant[]>((resolve, reject) => {
      this.get("api/match/" + matchKey + "/participants").then((res: any) => {
        resolve(res.map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatchesByTournamentLevel(tournamentLevel: number): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      this.get("api/match?tournament_level=" + tournamentLevel).then((res: any) => {
        resolve(res.map((matchJSON: any) => new Match().fromJSON(matchJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatchDetails(matchKey: string): Promise<MatchDetails> {
    return new Promise<MatchDetails>((resolve, reject) => {
      this.get("api/match/" + matchKey + "/details").then((res: any) => {
        const seasonKey: string = matchKey.split("-")[0];
        resolve(res.map((detailsJSON: any) => Match.getDetailsFromSeasonKey(seasonKey).fromJSON(detailsJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatchTeams(matchKey: string): Promise<MatchParticipant[]> {
    return new Promise<MatchParticipant[]>((resolve, reject) => {
      this.get("api/match/" + matchKey + "/teams").then((res: any) => {
        resolve(res.map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatchTeamRanks(matchKey: string): Promise<MatchParticipant[]> {
    return new Promise<MatchParticipant[]>((resolve, reject) => {
      this.get("api/match/" + matchKey + "/teamranks").then((res: any) => {
        resolve(res.map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getAlliances(): Promise<AllianceMember[]> {
    return new Promise<AllianceMember[]>((resolve, reject) => {
      this.get("api/alliance").then((res: any) => {
        resolve(res.map((allianceJSON: any) => new AllianceMember().fromJSON(allianceJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getActiveMatch(id: number): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      this.get("/api/match?active=" + id).then((res: any) => {
        resolve(res.map((matchJSON: any) => new Match().fromJSON(matchJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public calculateRankings(tournamentLevel: number, eventType: EventType): Promise<string> {
    return new Promise<any>((resolve, reject) => {
      this.get("api/ranking/calculate/" + tournamentLevel + "?type=" + eventType).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public deleteScheduleItems(type: TournamentType): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.delete("api/schedule/" + type).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public deleteRankings(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.delete("api/ranking").then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public postEvent(event: Event): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.post("api/event", event).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public postTeams(teams: Team[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.post("api/team", teams).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public postScheduleItems(scheduleItems: ScheduleItem[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.post("api/schedule", scheduleItems).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public postMatchSchedule(matches: Match[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.post("api/match", matches).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public postMatchScheduleParticipants(participants: MatchParticipant[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.post("api/match/participants", participants).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public postRankings(rankings: Ranking[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.post("api/ranking", rankings).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public postAllianceMembers(members: AllianceMember[]): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.post("api/alliance", members).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public putActiveMatch(match: Match): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.put("api/match/" + match.matchKey, match).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public putMatchResult(match: Match): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.put("api/match/" + match.matchKey + "/results", match).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public putMatchDetails(details: MatchDetails): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.put("api/match/" + details.matchKey + "/details", details).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public putMatchParticipants(participants: MatchParticipant[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.put("api/match/" + participants[0].matchKey + "/participants", participants).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public resetCardStatuses(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.get("api/team/cards/reset").then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

}

export default EMSProvider.getInstance();
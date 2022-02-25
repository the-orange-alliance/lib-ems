import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, default as Axios} from "axios";
import HttpError from "../models/ems/HttpError";
import IPostableObject from "../models/IPostableObject";
import Event from "../models/ems/Event";
import Team from "../models/ems/Team";
import Match from "../models/ems/Match";
import MatchDetails from "../models/ems/MatchDetails";
import MatchParticipant from "../models/ems/MatchParticipant";
import Ranking, {getRankingBySeasonKey, getRankingByEventType} from "../models/ems/Ranking";
import LiveStream from "../models/ems/LiveStream";
import {EventType} from "../Types";
import {EventService, OpenAPI, TeamService, MatchService} from "tba-api-v3client-ts";
import {RapidReactRank} from "../models/ems";

export interface ICompleteTeamResponse {
  team: Team;
  matches: Match[];
  rankings: Ranking[];
}

export enum Providers {
  TOA,
  FGA,
  FCA,
  TBA,
  CUSTOM
}

export interface CustomProvider {
  host: string,
  axios_config: {
    baseURL: string,
    timeout: number,
    headers: any
  }
}

// Automatic configurations
const toaConfig: CustomProvider = {
  host: "https://theorangealliance.org/api/",
  axios_config: {
    baseURL: "https://theorangealliance.org/api/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    },
  }
};

const fgaConfig: CustomProvider = {
  host: "http://live.first.global:9090/api/",
  axios_config: {
    baseURL: "http://live.first.global:9090/api/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    },
  }
};

const fcaConfig: CustomProvider = {
  host: "https://theorangealliance.org:9443/api/",
  axios_config: {
    baseURL: "https://theorangealliance.org:9443/api/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json"
    },
  }
};

class FGCProvider {
  private static _instance: FGCProvider;

  private _host: string;
  private _axios: AxiosInstance;
  private _config: AxiosRequestConfig;
  private _useTBA: boolean = false;

  public static getInstance(): FGCProvider {
    if (typeof FGCProvider._instance === "undefined") {
      FGCProvider._instance = new FGCProvider();
    }
    return FGCProvider._instance;
  }

  private constructor() {}

  /**
   * This method must be called before retrieving data. Since this class implements the singleton design
   * and the network of EMS may change, the provider must be manually initialized at runtime.
   */
  public initialize(provider: Providers, key?: string, customAppOrigin?: string, customProvider?: CustomProvider): void {
    // Set config values from templates
    switch(provider) {
      case Providers.TOA: {
        this._host = toaConfig.host;
        this._config = toaConfig.axios_config;
        this._config.headers["X-TOA-KEY"] = key;
        this._config.headers["X-Application-Origin"] = customAppOrigin ?? "FGCProvider_lib-ems";
        break;
      }
      case Providers.FGA: {
        this._host = fgaConfig.host;
        this._config = fgaConfig.axios_config;
        break;
      }
      case Providers.FCA: {
        this._host = fcaConfig.host;
        this._config = fcaConfig.axios_config;
        break;
      }
      case Providers.CUSTOM: {
        this._host = customProvider?.host;
        this._config = customProvider.axios_config;
        break;
      }
    }

    if (provider !== Providers.TBA) {
      this._useTBA = false;
      this._axios = Axios.create(this._config);
    } else {
      this._useTBA = true;
      OpenAPI.HEADERS = {
        "X-TBA-Auth-Key": key,
      }
    }
  }

  private get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._axios.get(url, {data: {}}).then((response: AxiosResponse) => {
        if (typeof response.data !== "undefined") {
          resolve(response.data);
        } else {
          reject(new HttpError(500, "ERR_NO_DATA", this._host + url));
        }
      }).catch((error: AxiosError) => {
        if (error.response) {
          reject(new HttpError(error.response.data.message, error.response.data.code, this._host + url));
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
        resolve(response);
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
      this._axios.post(url, {records}).then((response: AxiosResponse) => {
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
      this._axios.put(url, {records}).then((response: AxiosResponse) => {
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

  /* GET requests. */
  public ping(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if(!this._useTBA) {
        this.get("ping").then((data: any) => {
          resolve(data + "");
        }).catch((err: HttpError) => reject(err));
      } else {
        EventService.getEvent("2020miket").then(() => {
          resolve("");
        }).catch((err: HttpError) => {
          reject(err);
        })
      }
    });
  }

  public getLiveStreams(): Promise<LiveStream> {
    return new Promise<LiveStream>((resolve, reject) => {
      if(!this._useTBA) {
        this.get("api/streams").then((streamsJSON: any) => {
          resolve(streamsJSON.map((streamJSON: any) => new LiveStream().fromJSON(streamJSON)));
        }).catch((err: HttpError) => reject(err));
      } else { // Not in TBA Api provider
        resolve(new LiveStream());
      }
    });
  }

  public getActiveLiveStreams(): Promise<LiveStream> {
    return new Promise<LiveStream>((resolve, reject) => {
      this.get("api/streams?live=true").then((streamsJSON: any) => {
        resolve(streamsJSON.map((streamJSON: any) => new LiveStream().fromJSON(streamJSON)));
      }).catch((err: HttpError) => reject(err));
    });
  }

  public getEvent(eventKey: string): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      if(!this._useTBA) {
        this.get("api/event/" + eventKey).then((eventsJSON: any) => {
          const events: Event[] = eventsJSON.map((eventJSON: any) => new Event().fromJSON(eventJSON));
          resolve(events.length > 0 ? events[0] : new Event());
        }).catch((err: HttpError) => reject(err));
      } else {
        EventService.getEvent(eventKey).then(tbaEvent => {
          resolve(new Event().fromTBA(tbaEvent));
        }).catch((err: HttpError) => {
          reject(err);
        })
      }
    });
  }

  public getEventBySeason(seasonKey: string): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/event?season=${seasonKey}`).then((eventsJSON: any) => {
          const events: Event[] = eventsJSON.map((eventJSON: any) => new Event().fromJSON(eventJSON));
          resolve(events.length > 0 ? events[0] : new Event());
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve(new Event()); // TODO
      }
    });
  }

  public getAllTeams(): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      if(!this._useTBA) {
        this.get("api/teams").then((teamsJSON: any[]) => {
          resolve(teamsJSON.map((teamJSON: any) => new Team().fromJSON(teamJSON)));
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve([]); // TODO
      }
    });
  }

  public getTeams(eventKey: string): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      if(!this._useTBA) {
        this.get("api/event/" + eventKey + "/participants/teams").then((teamsJSON: any[]) => {
          resolve(teamsJSON.map((teamJSON: any) => new Team().fromJSON(teamJSON)));
        }).catch((err: HttpError) => reject(err));
      } else {
        EventService.getEventTeams(eventKey).then(teams => {
          resolve(teams.map(t => new Team().fromTBA(t)));
        }).catch((err: HttpError) => reject(err));
      }
    });
  }

  public getTeamsBySeason(seasonKey: string): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/teams?season=${seasonKey}`).then((teamsJSON: any[]) => {
          resolve(teamsJSON.map((teamJSON: any) => new Team().fromJSON(teamJSON)));
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve([]); // TODO
      }
    });
  }

  public getAllEventMatches(eventKey: string): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      if (!this._useTBA) {
        this.get(`api/match/event/${eventKey}/all`).then((matchesJSON: any) => {
          const matches: Match[] = [];
          for (const matchJSON of matchesJSON) {
            const seasonKey: string = eventKey.split("-")[0];
            const match: Match = new Match().fromJSON(matchJSON);
            match.matchDetails = Match.getDetailsFromSeasonKey(seasonKey).fromJSON(matchJSON);
            if (typeof matchJSON.participants !== "undefined") {
              match.participants = matchJSON.participants.map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON));
            }
            matches.push(match);
          }
          resolve(matches);
        });
      } else {
        EventService.getEventMatches(eventKey).then(matches => {
          resolve(matches.map(m => new Match().fromTBA(m)));
        }).catch((err: HttpError) => reject(err));
      }
    });
  }

  public getUpcomingMatches(seasonKey: string, length?: number): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      if(!this._useTBA) {
        const lengthQuery: string = length ? `?length=${length}` : '';
        this.get(`api/match/${seasonKey}/upcoming${lengthQuery}`).then((matchesJSON: any) => {
          resolve(matchesJSON.map((matchJSON: any) => new Match().fromJSON(matchJSON)));
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve([]); // TODO?
      }
    });
  }

  public getRankingTeams(eventKey: string, eventType?: EventType): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/rank/${eventKey}/teams`).then((rankingsJSON: any) => {
          resolve(rankingsJSON.map((rankJSON: any) => getRankingByEventType(eventType).fromJSON(rankJSON)));
        }).catch((err: HttpError) => reject(err));
      } else {
        EventService.getEventRankings(eventKey).then(tba => {
          if(eventKey.startsWith("2022")) {
            resolve(tba.rankings.map(rank => new RapidReactRank().fromTBA(rank)))
          } else {
            resolve([]);
          }
        }).catch((err: HttpError) => reject(err));
      }
    });
  }

  public getCompleteMatch(matchKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/match/${matchKey}/all`).then((matchJSON: any[]) => {
          const match: Match = new Match().fromJSON(matchJSON[0][0]);
          match.matchDetails = Match.getDetailsFromSeasonKey(match.matchKey.split("-")[0]).fromJSON(matchJSON[0][0]);
          match.participants = matchJSON[1].map((pJSON: any) => new MatchParticipant().fromJSON(pJSON));
          resolve(match);
        });
      } else {
        resolve(new Match());
      }
    });
  }

  public getTeam(teamKey: string): Promise<Team> {
    return new Promise<Team>((resolve, reject) => {
      if(!this._useTBA) {
        this.get("api/teams/" + teamKey).then((teamsJSON: any) => {
          const teams: Team[] = teamsJSON.map((teamJSON: any) => new Team().fromJSON(teamJSON));
          resolve(teams.length > 0 ? teams[0] : new Team());
        }).catch((err: HttpError) => reject(err));
      } else {
        TeamService.getTeam(teamKey).then(team => resolve(new Team().fromTBA(team))).catch((err: HttpError) => reject(err));
      }
    });
  }

  public getTeamMatches(teamKey: string, seasonKey: string, eventKey?: string): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/match/team/${teamKey}?season=${seasonKey}`).then((matchesJSON: any) => {
          const matches: Match[] = [];
          for (const matchJSON of matchesJSON) {
            const match: Match = new Match().fromJSON(matchJSON);
            if (typeof matchJSON.participants !== "undefined") {
              match.participants = matchJSON.participants.map((participantJSON: any) => new MatchParticipant().fromJSON(participantJSON));
            }
            matches.push(match);
          }
          resolve(matches);
        });
      } else {
        TeamService.getTeamEventMatches(teamKey, eventKey).then(tba => {
          resolve(tba.map(m => new Match().fromTBA(m)));
        }).catch((err: HttpError) => reject(err));
      }
    });
  }

  public getTeamRankings(teamKey: string, seasonKey: string): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/rank/team/${teamKey}?season=${seasonKey}`).then((rankingsJSON: any) => {
          resolve(rankingsJSON.map((rankJSON: any) => getRankingBySeasonKey(seasonKey).fromJSON(rankJSON)));
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve([]); // TODO
      }
    });
  };

  public getCompleteTeam(teamKey: string, seasonKey: string): Promise<ICompleteTeamResponse> {
    return new Promise<ICompleteTeamResponse>((resolve, reject) => {
      if(!this._useTBA) {
        const promises: Array<Promise<any>> = [];
        promises.push(this.getTeam(teamKey));
        promises.push(this.getTeamMatches(teamKey, seasonKey));
        promises.push(this.getTeamRankings(teamKey, seasonKey));
        Promise.all(promises).then((values: any[]) => {
          resolve({team: values[0], matches: values[1], rankings: values[2]});
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve({team: new Team(), matches: [], rankings: []}) // TODO
      }
    });
  }

  public getHighestScoringMatch(seasonKey: string, type: string, withPenalty: boolean): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/match/${seasonKey}/high-scores?type=${type}&penalty=${withPenalty}`).then((matchJSON: any) => {
          const match: Match = new Match().fromJSON(matchJSON[0]);
          match.participants = matchJSON[1].map((pJSON: any) => new MatchParticipant().fromJSON(pJSON));
          resolve(match);
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve(new Match()); // TODO
      }
    });
  }

  public getPlayedMatchCount(seasonKey: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if(!this._useTBA) {
        this.get(`api/match/size?season=${seasonKey}`).then((sizeJSON: any) => {
          resolve(sizeJSON.size);
        }).catch((err: HttpError) => reject(err));
      } else {
        resolve(-1); // todo
      }
    });
  };

  /* PUT, DELETE, and POST requests. */
  public deleteTeams(eventKey: string): Promise<AxiosResponse> {
    if(!this._useTBA) {
      return this.delete("api/event/" + eventKey + "/participants");
    } else {
      // MatchService.
    }
  }

  public deleteMatchData(eventKey: string, tournamentLevel: number, tournamentKey: string): Promise<AxiosResponse> {
    const keyQuery: string = tournamentKey ? `&tournament_key=${tournamentKey}` : ``;
    return this.delete(`api/match/${eventKey}/all?level=${tournamentLevel}${keyQuery}`);
  }

  public deleteRankings(eventKey: string): Promise<AxiosResponse> {
    return this.delete("api/rank/" + eventKey);
  }

  public deleteRankingsByLevel(eventKey: string, tournamentLevel: number): Promise<AxiosResponse> {
    return this.delete(`api/rank/${eventKey}?level=${tournamentLevel}`);
  }

  public postEventParticipants(eventKey: string, participants: Team[]): Promise<AxiosResponse> {
    return this.post("api/event/" + eventKey + "/participants", participants);
  }

  public postMatches(eventKey: string, matches: Match[]): Promise<AxiosResponse> {
    return this.post("api/match/" + eventKey, matches);
  }

  public postMatchDetails(eventKey: string, matches: MatchDetails[]): Promise<AxiosResponse> {
    return this.post("api/match/" + eventKey + "/details", matches);
  }

  public postMatchParticipants(eventKey: string, participants: MatchParticipant[]): Promise<AxiosResponse> {
    return this.post("api/match/" + eventKey + "/participants", participants);
  }

  public postRankings(eventKey: string, rankings: Ranking[]): Promise<AxiosResponse> {
    return this.post("api/rank/" + eventKey, rankings);
  }

  public postRankingsByLevel(eventKey: string, rankings: Ranking[], tournamentLevel: number): Promise<AxiosResponse> {
    return this.post(`api/rank/${eventKey}?level=${tournamentLevel}`, rankings);
  }

  public putMatchResults(eventKey: string, match: Match): Promise<AxiosResponse> {
    return this.put("api/match/" + match.matchKey, match);
  }

  public putMatchDetails(eventKey: string, matchDetails: MatchDetails): Promise<AxiosResponse> {
    return this.put("api/match/" + matchDetails.matchKey + "/details", matchDetails)
  }

  public putMatchParticipants(eventKey: string, participants: MatchParticipant[]): Promise<AxiosResponse> {
    return this.put("api/match/" + participants[0].matchKey + "/participants", participants);
  }
}

export default FGCProvider.getInstance();

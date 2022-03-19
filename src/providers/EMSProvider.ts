import IPostableObject from "../models/IPostableObject";
import {default as Axios, AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse} from "axios";
import {
  AllianceMember, Event, getRankingByEventType, HttpError, Match, MatchDetails, MatchParticipant, Ranking, ScheduleItem,
  Team, ResetPassword, User, Username
} from "../models/ems";
import {EventType, TournamentType} from "../Types";
import WPAKey from "../models/ems/WPAKey";
import {MatchMakerConfig, MatchMakerTeams, Process} from "../models";
import Host from "../models/ems/Host";
import {AllProcesses, AllProcessOperations} from "../models/ems/Process";
import UpdateSingleConfig from "../models/ems/UpdateSingleConfig";
import CustomData from "../models/ems/CustomData";

const PORT = process.env.REACT_APP_EMS_API_PORT;

class EMSProvider {
  private static _instance: EMSProvider;

  private _axios: AxiosInstance;
  private _config: AxiosRequestConfig;
  private _host: string;
  private _key: string;
  private _keyExpires: Date;

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
    return new Promise(async (resolve, reject) => {
      if (typeof this._axios === "undefined" || typeof this._host === "undefined") {
        reject(new HttpError(500, "ERR_PROVIDER_UNDEFINED", "The provider's host address has not been initialized."));
      }
      // If the expiration is in less than an hour, refresh the token
      if(this._keyExpires && this._keyExpires.valueOf() - Date.now() < (60 * 60 * 1000)) await this.authApiRefresh();
      let headers = {authorization: `Bearer ${this._key}`};
      this._axios.get(url, {data: {}, headers: headers}).then((response: AxiosResponse) => {
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

  private delete(url: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (typeof this._axios === "undefined" || typeof this._host === "undefined") {
        reject(new HttpError(500, "ERR_PROVIDER_UNDEFINED", "The provider's host address has not been initialized."));
      }
      // If the expiration is in less than an hour, refresh the token
      if(this._keyExpires && this._keyExpires.valueOf() - Date.now() < (60 * 60 * 1000)) await this.authApiRefresh();
      let headers = {authorization: `Bearer ${this._key}`};
      this._axios.delete(url, {data: {}, headers: headers}).then((response: AxiosResponse) => {
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
    return new Promise(async (resolve, reject) => {
      const records: object[] = [];
      if (body instanceof Array) {
        for (const record of body) {
          records.push(record.toJSON());
        }
      } else {
        if(body.hasOwnProperty(`toJSON`)) records.push(body.toJSON());
        else records.push(body);
      }
      if(this._keyExpires && this._keyExpires.valueOf() - Date.now() < (60 * 60 * 1000)) await this.authApiRefresh();
      let headers = {authorization: `Bearer ${this._key}`};
      this._axios.post(url, {records: records}, {headers: headers}).then((response: AxiosResponse) => {
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
    return new Promise(async (resolve, reject) => {
      const records: object[] = [];
      if (body instanceof Array) {
        for (const record of body) {
          records.push(record.toJSON());
        }
      } else {
        records.push(body.toJSON());
      }
      if(this._keyExpires && this._keyExpires.valueOf() - Date.now() < (60 * 60 * 1000)) await this.authApiRefresh();
      let headers = {authorization: `Bearer ${this._key}`};
      this._axios.put(url, {records: records}, {headers: headers}).then((response: AxiosResponse) => {
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

  public getAuthorization(): string {
    return this._key
  }

  /**
   * Verify an API token key
   * @param fullKey Full API Key, including "Bearer "
   */
  public verifyAuth(fullKey: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      if (!fullKey) return reject(false);
      this._axios.get('api/account/whoami', {data: {}, headers: {authorization: fullKey}}).then((response: AxiosResponse) => {
        if(response.status > 199 && response.status < 211 && response.data) {
          resolve(new User().fromJSON(response.data));
        } else {
          reject(false);
        }
      }).catch((err) => {
        reject(err);
      })
    })
  }

  public getUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.get('api/account/users').then((data) => {
        if(data&& Array.isArray(data)) {
          resolve(data.map((userJSON: any) => new User().fromJSON(userJSON)));
        } else {
          reject();
        }
      });
    });
  }

  public getApiKeys(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this.get('api/account/apikeys').then((data) => {
        if(data&& Array.isArray(data)) {
          resolve(data.map((userJSON: any) => new User().fromJSON(userJSON)));
        } else {
          reject();
        }
      });
    });
  }

  public checkUsername(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const un = new Username().fromJSON({username: username});
      this.post('api/account/checkusername', un).then((data: AxiosResponse<{payload: {available: boolean}}>) => {
        if(data.status > 199 && data.status < 211) {
          resolve(data.data.payload.available);
        } else {
          reject();
        }
      });
    });
  }

  public createUser(user: User | User[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.post('api/account/createuser', user).then((data: AxiosResponse<{payload: any}>) => {
        if(data.status > 199 && data.status < 211) {
          resolve(data.data.payload);
        } else {
          reject();
        }
      });
    });
  }

  public deleteUser(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.delete(`api/account/${username}/deleteuser`).then((data: any) => {
        if(data.ok) {
          // todo: emit to socket server that user is deleted, so it can be cleared
          resolve(true);
        } else {
          reject();
        }
      });
    });
  }

  public deleteKey(key: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.delete(`api/account/${key}/deleteapikey`).then((data: any) => {
        if(data.ok) {
          // todo: emit to socket server that user is deleted, so it can be cleared
          resolve(true);
        } else {
          reject();
        }
      });
    });
  }

  public updateUser(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.put(`api/account/${user.username}/updateuser`, user).then((data: AxiosResponse<{payload: {ok: boolean}}>) => {
        if(data) {
          resolve(data.data.payload.ok);
        } else {
          reject();
        }
      });
    });
  }

  public updateApiKey(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.put(`api/account/${user.apiKey}/updateuser`, user).then((data: AxiosResponse<{payload: {ok: boolean}}>) => {
        if(data) {
          resolve(data.data.payload.ok);
        } else {
          reject();
        }
      });
    });
  }

  public resetPassword(passwords: ResetPassword): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.post('api/account/changepassword', passwords).then((resp: AxiosResponse<{success: boolean}>) => {
        if(resp.status > 199 && resp.status < 211) {
          resolve(resp.data.success);
        } else {
          reject();
        }
      });
    })
  }

  public whoAmI(): Promise<User> { // todo: use User model
    return new Promise<User>((resolve, reject) => {
      this.get('api/account/whoami').then((resp: AxiosResponse<any>) => {
        if(resp.status > 199 && resp.status < 211) {
          resolve(new User().fromJSON(resp.data));
        } else {
          reject();
        }
      });
    })
  }

  public authPassword(username: string, password: string): Promise<string> {
    const body = {
      username: username,
      password: password,
      auth_type: 'password'
    };
    return this.doApiAuth(body, false);
  }

  public authApiKey(key: string): Promise<string> {
    const body = {
      api_key: key,
      auth_type: 'apikey'
    };
    return this.doApiAuth(body, false);
  }

  public authOldKey(oldKey: string): Promise<string> {
    const body = {
      old_token: oldKey,
      auth_type: 'refresh'
    };
    return this.doApiAuth(body, false);
  }

  public authApiRefresh(): Promise<string> {
    const body = {
      old_token: this._key,
      auth_type: 'refresh'
    };
    return this.doApiAuth(body, false);
  }

  public authApiRevoke(): Promise<string> {
    const body = {
      old_token: this._key,
      auth_type: 'revoke'
    };
    return this.doApiAuth(body, true);
  }

  private doApiAuth(body: any, isRevoke: boolean): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this._axios.post('api/auth/token',  body).then((response: AxiosResponse) => {
        if(response.status > 199 && response.status < 211) {
          if(isRevoke && response.data.success) {
            this._key = null;
            this._keyExpires = null;
            resolve(this._key);
          } else if (response.data.token) {
            this._key = response.data.token;
            this._keyExpires = new Date(Date.now() + (response.data.expires) * 1000);
            resolve(this._key);
          } else {
            reject();
          }
        } else {
          reject();
        }
      }).catch(() => {
        reject();
      })
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

  public getWpaKeys(): Promise<WPAKey[]> {
    return new Promise<WPAKey[]>((resolve, reject) => {
      this.get("api/team/wpakeys").then((res: any) => {
        resolve(res.map((wpaJson: any) => new WPAKey().fromJSON(wpaJson)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getAdvNetConfig(eventKey: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.get("api/event/" + eventKey + "/networking").then((res: any) => {
        resolve(res);
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

  public getPlayoffsScheduleItems(type: TournamentType, keyPartial: string, tournamentId: number): Promise<ScheduleItem[]> {
    return new Promise<ScheduleItem[]>((resolve, reject) => {
      this.get(`api/schedule/playoffs/${keyPartial}?id=${tournamentId}`).then((res: any) => {
        resolve(res.map((scheduleItemJSON: any) => new ScheduleItem(type).fromJSON(scheduleItemJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getMatchesAndParticipants(matchKeyPartial: string, tournamentLevel?: number): Promise<Match[]> {
    const tournamentQuery: string = tournamentLevel ? `&tournament_level=${tournamentLevel}` : ``;
    return new Promise<Match[]>((resolve, reject) => {
      this.get(`api/match?match_key_partial=${matchKeyPartial}${tournamentQuery}`).then((res: any) => {
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
    return new Promise<any[]>((resolve, reject) => {
      this.get("api/ranking").then((res: any) => {
        resolve(res.map((rankingJSON: any) => getRankingByEventType(eventType).fromJSON(rankingJSON)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getRankingTeams(eventType?: EventType): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      this.get("api/ranking/teams").then((res: any) => {
        resolve(res.map((rankingJSON: any) => getRankingByEventType(eventType).fromJSON(rankingJSON)));
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

  public postAdvNetConfig(eventKey: string, config: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.post(`api/event/${eventKey}/networking`, config).then((res: any) => {
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

  public listEcosystem(): Promise<Process[]> {
    return new Promise<any>((resolve, reject) => {
      this.get("api/services").then((res: any) => {
        resolve(res.map((p: any) => new Process().fromJSON(p)));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public killEcosystem(): Promise<boolean> {
    return new Promise<any>((resolve, reject) => {
      this.delete("api/services/killEcosystem").then((res: any) => {
        resolve(res.ok);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public manageProcess(procOp: AllProcessOperations, procName: AllProcesses, host?: Host): Promise<Process> {
    if(!host) host = new Host('');
    return new Promise<any>((resolve, reject) => {
      this.post(`api/services/${procOp}/${procName}`, host).then((res: any) => {
        resolve(new Process().fromJSON(res));
      }).catch((error: HttpError) => reject(error));
    });
  }

  public getConfig(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.get(`api/config`).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public setConfig(data: any): Promise<any> {
    const conf = new CustomData(data);
    return new Promise<any>((resolve, reject) => {
      this.post(`api/config/set/all`, conf).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public updateSingleConfig(key: string, data: any): Promise<any> {
    const toUpdate = new UpdateSingleConfig(key, data);
    return new Promise<any>((resolve, reject) => {
      this.post(`api/config/set/single`, toUpdate).then((res: any) => {
        resolve(res);
      }).catch((error: HttpError) => reject(error));
    });
  }

  public matchMakerTeams(tournamentType: TournamentType, teams: number[]): Promise<string> {
    const mmt = new MatchMakerTeams();
    mmt.teams = teams;
    mmt.tournamentType = tournamentType;
    return new Promise(((resolve, reject) => {
      this.post('api/matchmaker/teams', mmt).then((res) => {
        resolve(res.data.path);
      }).catch((error: HttpError) => reject(error));
    }));
  }

  public matchMaker(config: MatchMakerConfig): Promise<Match[]> {
    return new Promise(((resolve, reject) => {
      this.post('api/matchmaker/run', config).then((res) => {
        if(!Array.isArray(res.data)) reject("MatchMaker response is not an array")
        else resolve(res.data.map(m => new Match().fromJSON(m)));
      }).catch((error: HttpError) => reject(error));
    }));
  }

}

export default EMSProvider.getInstance();

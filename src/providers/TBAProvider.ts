import {AxiosResponse, default as Axios} from "axios";
import HttpError from "../models/ems/HttpError";
import Event from "../models/ems/Event";
import Team from "../models/ems/Team";
import Match from "../models/ems/Match";
import MatchDetails from "../models/ems/MatchDetails";
import MatchParticipant from "../models/ems/MatchParticipant";
import {EventType} from "../Types";
import {EventService, MatchService, OpenAPI, TeamService} from "tba-api-v3client-ts/lib/cjs";
import {RapidReactRank} from "../models/ems";
import {DEFAULT_BREAKDOWNS, WritableRankings} from "../models/tba/WritableRanks";
import {createHash} from "crypto";
import {WritableMatch} from "../models/tba/WritableMatch";
import {Ranking} from "../models";

class TBAProvider {
  private static _instance: TBAProvider;
  private _tbaConfig: {clientId: string, secret: string};

  private constructor() {
  }

  public static getInstance(): TBAProvider {
    if (typeof TBAProvider._instance === "undefined") {
      TBAProvider._instance = new TBAProvider();
    }
    return TBAProvider._instance;
  }

  /**
   * This method must be called before retrieving data. Since this class implements the singleton design
   * and the network of EMS may change, the provider must be manually initialized at runtime.
   *
   * For TBA, key is client secret and customAppOrigin is AuthID
   */
  public initialize(secret: string, clientId: string): void {
    // Set config values from templates
    OpenAPI.HEADERS = {
      "X-TBA-Auth-Key": secret,
    }
    this._tbaConfig.secret = secret;
    this._tbaConfig.clientId = clientId;
  }

  /* GET requests. */
  public ping(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      EventService.getEvent("2020miket").then(() => {
        resolve("");
      }).catch((err: HttpError) => {
        reject(err);
      })
    });
  }

  public getEvent(eventKey: string): Promise<Event> {
    return new Promise<Event>((resolve, reject) => {
      EventService.getEvent(eventKey).then(tbaEvent => {
        resolve(new Event().fromTBA(tbaEvent));
      }).catch((err: HttpError) => {
        reject(err);
      })
    });
  }

  public getAllTeams(): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      resolve([]); // TODO
    });
  }

  public getTeams(eventKey: string): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      EventService.getEventTeams(eventKey).then(teams => {
        resolve(teams.map(t => new Team().fromTBA(t)));
      }).catch((err: HttpError) => reject(err));
    });
  }

  public getTeamsBySeason(seasonKey: string): Promise<Team[]> {
    return new Promise<Team[]>((resolve, reject) => {
      resolve([]); // TODO
    });
  }

  public getAllEventMatches(eventKey: string): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      EventService.getEventMatches(eventKey).then(matches => {
        resolve(matches.map(m => new Match().fromTBA(m)));
      }).catch((err: HttpError) => reject(err));
    });
  }

  public getUpcomingMatches(seasonKey: string, length?: number): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      resolve([]); // TODO?
    });
  }

  public getRankingTeams(eventKey: string, eventType?: EventType): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      EventService.getEventRankings(eventKey).then(tba => {
        if (eventKey.startsWith("2022")) {
          resolve(tba.rankings.map(rank => new RapidReactRank().fromTBA(rank)))
        } else {
          resolve([]);
        }
      }).catch((err: HttpError) => reject(err));
    });
  }

  public getCompleteMatch(matchKey: string): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      MatchService.getMatch(matchKey).then(tba => {
        resolve(new Match().fromTBA(tba));
      }).catch((err: HttpError) => reject(err));
    });
  }

  public getTeam(teamKey: string): Promise<Team> {
    return new Promise<Team>((resolve, reject) => {
      TeamService.getTeam(teamKey).then(team => resolve(new Team().fromTBA(team))).catch((err: HttpError) => reject(err));
    });
  }

  public getTeamMatches(teamKey: string, seasonKey: string, eventKey?: string): Promise<Match[]> {
    return new Promise<Match[]>((resolve, reject) => {
      TeamService.getTeamEventMatches(teamKey, eventKey).then(tba => {
        resolve(tba.map(m => new Match().fromTBA(m)));
      }).catch((err: HttpError) => reject(err));
    });
  }

  public getTeamRankings(teamKey: string, seasonKey: string): Promise<Ranking[]> {
    return new Promise<Ranking[]>((resolve, reject) => {
      resolve([]); // TODO
    });
  };

  public getHighestScoringMatch(seasonKey: string, type: string, withPenalty: boolean): Promise<Match> {
    return new Promise<Match>((resolve, reject) => {
      resolve(new Match()); // TODO
    });
  }

  public getPlayedMatchCount(seasonKey: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      resolve(-1); // todo
    });
  };

  /* PUT, DELETE, and POST requests. */
  public deleteTeams(eventKey: string): Promise<AxiosResponse> {
    return this.postTeams(eventKey, []);
  }

  public deleteMatchData(eventKey: string, tournamentLevel: number, tournamentKey: string): Promise<AxiosResponse> {
    return EventService.getEventMatchesKeys(eventKey).then(data => {
      return this.deleteMatches(eventKey, data);
    })
  }

  public deleteRankings(eventKey: string): Promise<AxiosResponse> {
    return this.postWritableRankings(eventKey, {rankings: [], breakdowns: DEFAULT_BREAKDOWNS})
  }

  public postEventParticipants(eventKey: string, participants: Team[]): Promise<AxiosResponse> {
    const tbaTeams = participants.map(p => "frc" + p.teamKey);
    return this.postTeams(eventKey, tbaTeams);
  }

  public postMatches(eventKey: string, matches: Match[]): Promise<AxiosResponse> {
    const tbaMatches = matches.map(m => m.toTBA(eventKey));
    return this.postWritableMatches(eventKey, tbaMatches);
  }

  public postMatchDetails(eventKey: string, matches: MatchDetails[]): Promise<AxiosResponse> {
    // Breakdowns are uploaded with the match data
    return new Promise(resolve => resolve(null));
  }

  public postMatchParticipants(eventKey: string, participants: MatchParticipant[]): Promise<AxiosResponse> {
    // Participants are uploaded with the match data
    return new Promise(resolve => resolve(null));
  }

  public postRankings(eventKey: string, rankings: Ranking[]): Promise<AxiosResponse> {
    const ranks = rankings.map(r => r.toTBA());
    const tbaPostable: WritableRankings = {
      breakdowns: DEFAULT_BREAKDOWNS,
      rankings: ranks
    }
    return this.postWritableRankings(eventKey, tbaPostable);
  }

  public putMatchResults(eventKey: string, match: Match): Promise<AxiosResponse> {
    return this.postMatch(eventKey, match.toTBA(eventKey));
  }

  /**
   * The Write API is used to create and modify data in the The Blue Alliance API.
   * @param endpoint The endpoint to send the request to
   * @param data The data to send
   * @returns The response from the server
   */
  private post(endpoint: string, data: any) {
    const {clientId, secret} = this._tbaConfig;

    const body = JSON.stringify(data);
    const md5Hash = createHash("md5")
      .update(`${secret}/api/trusted/v1${endpoint}${body}`)
      .digest("hex");

    const headers = {
      "X-TBA-Auth-Id": clientId,
      "X-TBA-Auth-Sig": md5Hash,
      "Content-Type": "application/json",
    };

    const url = `https://www.thebluealliance.com/api/trusted/v1${endpoint}`;

    return Axios.post(url, body, {
      headers
    });
  };

  /**
   * Post updated team data to the TBA API.
   * @param eventKey The event key to post teams to
   * @param teamKeys The team numbers to post
   * @returns The response from the server
   */
  private postTeams(eventKey: string, teamKeys: string[]) {
    const endpoint = `/event/${eventKey}/team_list/update`;

    // const teamKeys = teamNumbers.map((team: number) => {
    //     return "frc" + team;
    // });

    return this.post(endpoint, teamKeys);
  };

  /**
   * Post updated match data to the TBA API.
   * @param eventKey The event key to post matches to
   * @param match The match to post
   * @returns The response from the server
   */
  private postMatch(eventKey: string, match: WritableMatch<any>) {
    const endpoint = `/event/${eventKey}/matches/update`;
    return this.post(endpoint, [match]);
  };

  /**
   * Post updated matches to the TBA API.
   * @param eventKey The event key to post matches to
   * @param matches The match to post
   * @returns The response from the server
   */
  private postWritableMatches(eventKey: string, matches: WritableMatch<any>[]) {
    const endpoint = `/event/${eventKey}/matches/update`;
    return this.post(endpoint, matches);
  }

  /**
   * Delete matches from the TBA api.
   * @param eventKey The event key to post delete match from
   * @param matchNumbers The match numbers to delete
   * @returns The response from the server
   */
  private deleteMatches(eventKey: string, matchNumbers: string[]) {
    const endpoint = `/event/${eventKey}/matches/delete`;
    return this.post(endpoint, matchNumbers);
  };


  /**
   * Update event info
   * @param eventKey
   * @param bracketType
   * @private
   */   // @ts-ignore
  private eventData(eventKey: string, bracketType: number) {
    const endpoint = `/event/${eventKey}/info/update`;
    const data = {
      playoff_type: bracketType,
    };
    return this.post(endpoint, data);
  }

  /**
   * Write ranks
   */
  private postWritableRankings(eventKey: string, ranks: WritableRankings) {
    const endpoint = `/event/${eventKey}/rankings/update`;
    return this.post(endpoint, ranks);
  }

  /**
   * Post Alliance Data
   * @param eventKey
   * @param alliances
   * @private
   */   // @ts-ignore
  private uploadAlliances(eventKey: string, alliances: string[][]) {
    const endpoint = `/event/${eventKey}/alliance_selections/update`;
    return this.post(endpoint, alliances);
  }
}

export default TBAProvider.getInstance();

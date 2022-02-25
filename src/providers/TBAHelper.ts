// Thanks Josh ♥
// https://github.com/CrispyBacon1999/TBA-Datasync/blob/main/lib/WriteApi.ts
import Axios from "axios";
import {createHash} from "crypto";
import {WritableMatch} from "../models/tba/WritableMatch";
import {WritableRankings} from "../models/tba/WritableRanks";

export interface TBAWriteCredentials {
  clientId: string,
  secret: string
}

/**
 * The Write API is used to create and modify data in the The Blue Alliance API.
 * @param endpoint The endpoint to send the request to
 * @param data The data to send
 * @param credentials Write API Credentials
 * @returns The response from the server
 */
export const fetch = async (endpoint: string, data: any, credentials: TBAWriteCredentials) => {
  const { clientId, secret } = credentials;

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
 * @param credentials Write API Credentials
 * @returns The response from the server
 */
export const postTeams = async (eventKey: string, teamKeys: string[], credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/team_list/update`;

  // const teamKeys = teamNumbers.map((team: number) => {
  //     return "frc" + team;
  // });

  return fetch(endpoint, teamKeys, credentials);
};

/**
 * Post updated match data to the TBA API.
 * @param eventKey The event key to post matches to
 * @param match The match to post
 * @param credentials Write API Credentials
 * @returns The response from the server
 */
export const postMatch = async (eventKey: string, match: WritableMatch<any>, credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/matches/update`;
  return fetch(endpoint, [match], credentials);
};

/**
 * Post updated matches to the TBA API.
 * @param eventKey The event key to post matches to
 * @param matches The match to post
 * @param credentials Write API Credentials
 * @returns The response from the server
 */
export const postMatches = async (eventKey: string, matches: WritableMatch<any>[], credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/matches/update`;
  return fetch(endpoint, matches, credentials);
};

/**
 * Delete a match from the TBA api.
 * @param eventKey The event key to post delete match from
 * @param matchNumber The match number to delete
 * @param credentials Write API Credentials
 * @returns The response from the server
 */
export const deleteMatch = async (eventKey: string, matchNumber: string, credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/matches/delete`;
  return fetch(endpoint, [matchNumber], credentials);
};

/**
 * Delete matches from the TBA api.
 * @param eventKey The event key to post delete match from
 * @param matchNumbers The match numbers to delete
 * @param credentials Write API Credentials
 * @returns The response from the server
 */
export const deleteMatches = async (eventKey: string, matchNumbers: string[], credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/matches/delete`;
  return fetch(endpoint, matchNumbers, credentials);
};

export const eventData = async (eventKey: string, bracketType: number, credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/info/update`;
  const data = {
    playoff_type: bracketType,
  };
  return fetch(endpoint, data, credentials);
};

/**
 * Write ranks
 */
export const postRankings = async (eventKey: string, ranks: WritableRankings, credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/rankings/update`;
  return fetch(endpoint, ranks, credentials);
};

export const uploadAlliances = async (eventKey: string, alliances: string[][], credentials: TBAWriteCredentials) => {
  const endpoint = `/event/${eventKey}/alliance_selections/update`;
  return fetch(endpoint, alliances, credentials);
};
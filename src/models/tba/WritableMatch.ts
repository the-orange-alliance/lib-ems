import {Match} from "tba-api-v3client-ts";

export interface WritableMatch<T> {
  key: string;
  comp_level: Match.comp_level;
  set_number: number;
  match_number: number;
  event_key: string;
  score_breakdown?: T;
  alliances: WritableAlliances;
  time_utc: string;
}

export interface WritableAlliances {
  red: WritableAlliance;
  blue: WritableAlliance;
}

export interface WritableAlliance {
  teams: string[];
  score: number;
  surrogates: string[];
  dqs: string[];
}
import Season from "../models/ems/Season";
import {EventType} from "../Types";
import {DropdownProps} from "../Props";

const seasonsList = [
  {
    "season_key": 2018,
    "season_desc": "FGC Energy Impact"
  },
  {
    "season_key": 1718,
    "season_desc": "FTC Relic Recovery"
  },
  {
    "season_key": 1819,
    "season_desc": "FTC Rover Ruckus"
  },
  {
    "season_key": 19,
    "season_desc": "FRC Destination: Deep Space"
  }
];

export const Seasons: Season[] = seasonsList.map(season => new Season(season.season_key, season.season_desc));
export const SeasonItems: any[] = Seasons.map(season => ({text: season.seasonDesc, value: season.seasonKey}));

export function getFromEventType(eventType: EventType): DropdownProps {
  switch (eventType) {
    case "fgc_2018":
      return SeasonItems[0];
    case "ftc_1718":
      return SeasonItems[1];
    case "ftc_1819":
      return SeasonItems[2];
    case "frc_19":
      return SeasonItems[3];
    default:
      return SeasonItems[2];
  }
}

export function getFromSeasonKey(seasonKey: number | string | boolean): Season {
  for (const season of Seasons) {
    if (season.seasonKey === seasonKey) {
      return season;
    }
  }
  return null;
}
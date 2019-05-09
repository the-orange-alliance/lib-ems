import Match from "../models/ems/Match";
import TOAMatch from "../models/toa/TOAMatch";
import * as moment from "moment";
import MatchDetails from "../models/ems/MatchDetails";

export default class TOAMatchAdapter {
  private _match: Match;
  private _matchDetails: MatchDetails;

  constructor(match: Match, matchDetails: MatchDetails) {
    this._match = match;
    this._matchDetails = matchDetails;
  }

  public get(): TOAMatch {
    const match: TOAMatch = new TOAMatch();
    const matchKey: string = this._match.matchKey + "-1";
    const keyParams: string[] = matchKey.split("-");
    match.matchKey = this._match.matchKey + "-1";
    match.eventKey = keyParams[0] + "-" + keyParams[1] + "-" + keyParams[2];
    match.tournamentLevel = this.getTournamentLevel();
    match.scheduledTime =  moment(this._match.scheduledStartTime.format('YYYY/MM/DD HH:mm:ss')).format("YYYY-MM-DD HH:mm:ss");
    match.matchName = this.getShortName();
    match.playNumber = 1;
    match.fieldNumber = this._match.fieldNumber;
    match.redScore = this._match.redScore;
    match.blueScore = this._match.blueScore;
    match.redPenalty = this._matchDetails.getRedPenalty(this._match.blueMinPen || 0, this._match.blueMajPen || 0);
    match.bluePenalty = this._matchDetails.getBluePenalty(this._match.redMinPen || 0, this._match.redMajPen || 0);
    match.redAutoScore = this._matchDetails.getRedAutoScore();
    match.blueAutoScore = this._matchDetails.getBlueAutoScore();
    match.redTeleScore = this._matchDetails.getRedTeleScore();
    match.blueTeleScore = this._matchDetails.getBlueTeleScore();
    match.redEndScore = this._matchDetails.getRedEndScore();
    match.blueEndScore = this._matchDetails.getBlueEndScore();
    return match;
  }

  getShortName() {
    const matchName = this._match.matchName;
    if (matchName.startsWith('Qualification Match')) {
      return matchName.replace('Qualification Match', 'Quals');
    } else if (matchName.startsWith('Quarterfinal')) {
      return matchName.replace('Quarterfinal', 'Quarters');
    } else if (matchName.startsWith('Semifinal')) {
      return matchName.replace('Semifinal', 'Semis');
    } else if (matchName.startsWith('Finals Match')) {
      return matchName.replace('Finals Match', 'Finals');
    }
    return matchName;
  }

  getTournamentLevel() {
    const tournamentLevel = this._match.tournamentLevel;
    if (tournamentLevel >= 20 && tournamentLevel < 40) {
      return tournamentLevel + 1;
    } else if (tournamentLevel === 40) {
      return 4;
    } else {
      return tournamentLevel;
    }
  }
}
import MatchDetails from "../../MatchDetails";
import IPostableObject from "../../../IPostableObject";

export default class RapidReactMatchDetails extends MatchDetails implements IPostableObject {

  public static HANGAR_LOW = 4;
  public static HANGAR_MID = 6;
  public static HANGAR_HIGH = 10;
  public static HANGAR_TRAVERSAL = 15;

  // ** RED ** //
  // Auto
  private _redAutoTaxiRobot1:  boolean;
  private _redAutoTaxiRobot2: boolean;
  private _redAutoTaxiRobot3: boolean;
  private _redAutoCargoLow: number;
  private _redAutoCargoHigh: number;

  // Tele Scoring
  private _redTeleCargoLow: number;
  private _redTeleCargoHigh: number;

  // Endgame Hanger
  private _redHangerRobot1: number;
  private _redHangerRobot2: number;
  private _redHangerRobot3: number;

  // Bonuses (extra ranking points)
  private _redCargoBonus: boolean;
  private _redHangarBonus: boolean;

  // ** BLUE ** //
  // Auto
  private _blueAutoTaxiRobot1:  boolean;
  private _blueAutoTaxiRobot2: boolean;
  private _blueAutoTaxiRobot3: boolean;
  private _blueAutoCargoLow: number;
  private _blueAutoCargoHigh: number;

  // Tele Scoring
  private _blueTeleCargoLow: number;
  private _blueTeleCargoHigh: number;

  // Endgame Hanger
  private _blueHangerRobot1: number;
  private _blueHangerRobot2: number;
  private _blueHangerRobot3: number;

  // Bonuses (extra ranking points)
  private _blueCargoBonus: boolean;
  private _blueHangarBonus: boolean;


  constructor() {
    super();
    // Red
    this._redAutoTaxiRobot1 = false;
    this._redAutoTaxiRobot2 = false;
    this._redAutoTaxiRobot3 = false;
    this._redAutoCargoLow = 0;
    this._redAutoCargoHigh = 0;
    this._redTeleCargoLow = 0;
    this._redTeleCargoHigh = 0;
    this._redHangerRobot1 = 0;
    this._redHangerRobot2 = 0;
    this._redHangerRobot3 = 0;
    this._redCargoBonus = false;
    this._redHangarBonus = false;

    // Blue
    this._blueAutoTaxiRobot1 = false;
    this._blueAutoTaxiRobot2 = false;
    this._blueAutoTaxiRobot3 = false;
    this._blueAutoCargoLow = 0;
    this._blueAutoCargoHigh = 0;
    this._blueTeleCargoLow = 0;
    this._blueTeleCargoHigh = 0;
    this._blueHangerRobot1 = 0;
    this._blueHangerRobot2 = 0;
    this._blueHangerRobot3 = 0;
    this._blueCargoBonus = false;
    this._blueHangarBonus = false;
  }

  public toJSON(): object {
    return {
      match_key: this.matchKey,
      match_detail_key: this.matchDetailKey,
      red_auto_taxi_robot_1: this.redAutoTaxiRobot1,
      red_auto_taxi_robot_2: this.redAutoTaxiRobot2,
      red_auto_taxi_robot_3: this.redAutoTaxiRobot3,
      red_auto_cargo_low: this.redAutoCargoLow,
      red_auto_cargo_high: this.redAutoCargoHigh,
      red_tele_cargo_low: this.redTeleCargoLow,
      red_tele_cargo_high: this.redTeleCargoHigh,
      red_hangar_robot_1: this.redHangerRobot1,
      red_hangar_robot_2: this.redHangerRobot2,
      red_hangar_robot_3: this.redHangerRobot3,
      red_cargo_bonus: this.redCargoBonus,
      red_hangar_bonus: this.redHangarBonus,
      blue_auto_taxi_robot_1: this.blueAutoTaxiRobot1,
      blue_auto_taxi_robot_2: this.blueAutoTaxiRobot2,
      blue_auto_taxi_robot_3: this.blueAutoTaxiRobot3,
      blue_auto_cargo_low: this.blueAutoCargoLow,
      blue_auto_cargo_high: this.blueAutoCargoHigh,
      blue_tele_cargo_low: this.blueTeleCargoLow,
      blue_tele_cargo_high: this.blueTeleCargoHigh,
      blue_hangar_robot_1: this.blueHangerRobot1,
      blue_hangar_robot_2: this.blueHangerRobot2,
      blue_hangar_robot_3: this.blueHangerRobot3,
      blue_cargo_bonus: this.blueCargoBonus,
      blue_hangar_bonus: this.blueHangarBonus,
    };
  }

  public fromJSON(json: any): RapidReactMatchDetails {
    const details: RapidReactMatchDetails = new RapidReactMatchDetails();
    details.matchKey = json.match_key;
    details.matchDetailKey = json.match_detail_key;
    details.redAutoTaxiRobot1 = json.red_auto_taxi_robot_1;
    details.redAutoTaxiRobot2 = json.red_auto_taxi_robot_2;
    details.redAutoTaxiRobot3 = json.red_auto_taxi_robot_3;
    details.redAutoCargoLow = json.red_auto_cargo_low;
    details.redAutoCargoHigh = json.red_auto_cargo_high;
    details.redTeleCargoLow = json.red_tele_cargo_low;
    details.redTeleCargoHigh = json.red_tele_cargo_high;
    details.redHangerRobot1 = json.red_hangar_robot_1;
    details.redHangerRobot2 = json.red_hangar_robot_2;
    details.redHangerRobot3 = json.red_hangar_robot_3;
    details.redCargoBonus = json.red_cargo_bonus;
    details.redHangarBonus = json.red_hangar_bonus;
    details.blueAutoTaxiRobot1 = json.blue_auto_taxi_robot_1;
    details.blueAutoTaxiRobot2 = json.blue_auto_taxi_robot_2;
    details.blueAutoTaxiRobot3 = json.blue_auto_taxi_robot_3;
    details.blueAutoCargoLow = json.blue_auto_cargo_low;
    details.blueAutoCargoHigh = json.blue_auto_cargo_high;
    details.blueTeleCargoLow = json.blue_tele_cargo_low;
    details.blueTeleCargoHigh = json.blue_tele_cargo_high;
    details.blueHangerRobot1 = json.blue_hangar_robot_1;
    details.blueHangerRobot2 = json.blue_hangar_robot_2;
    details.blueHangerRobot3 = json.blue_hangar_robot_3;
    details.blueCargoBonus = json.blue_cargo_bonus;
    details.blueHangarBonus = json.blue_hangar_bonus;
    return details;
  }

  public toTBA(majRedPen: number, minRedPen: number, majBluePen: number, minBluePen: number): any {
    return {
      red: {
        taxiRobot1: this.redAutoTaxiRobot1 ? "Yes" : "No",
        endgameRobot1: this.endStatusToString(this.redHangerRobot1),
        taxiRobot2: this.redAutoTaxiRobot2 ? "Yes" : "No",
        endgameRobot2: this.endStatusToString(this.redHangerRobot2),
        taxiRobot3: this.redAutoTaxiRobot3 ? "Yes" : "No",
        endgameRobot3: this.endStatusToString(this.redHangerRobot3),
        autoCargoLowerNear: 0,
        autoCargoLowerFar: 0,
        autoCargoLowerBlue: 0, // this.blueAutoCargoLow,
        autoCargoLowerRed: this.redAutoCargoLow,
        autoCargoUpperNear: 0,
        autoCargoUpperFar: 0,
        autoCargoUpperBlue: 0, // this.blueAutoCargoHigh,
        autoCargoUpperRed: this.redAutoCargoHigh,
        autoCargoTotal: this.redAutoCargoLow + this.redAutoCargoHigh,
        teleopCargoLowerNear: 0,
        teleopCargoLowerFar: 0,
        teleopCargoLowerBlue: 0, // this.blueTeleCargoLow,
        teleopCargoLowerRed: this.redTeleCargoLow,
        teleopCargoUpperNear: 0,
        teleopCargoUpperFar: 0,
        teleopCargoUpperBlue: 0, // this.blueTeleCargoHigh,
        teleopCargoUpperRed: this.redTeleCargoHigh,
        teleopCargoTotal: this.redTeleCargoLow + this.redTeleCargoHigh,
        matchCargoTotal: this.redAutoCargoHigh + this.redAutoCargoLow + this.redTeleCargoHigh + this.redTeleCargoLow,
        autoTaxiPoints: this.getRedAutoScore() - ((this.redAutoCargoLow * 2) + (this.redAutoCargoHigh * 4)),
        autoCargoPoints: (this.redAutoCargoLow * 2) + (this.redAutoCargoHigh * 4),
        autoPoints: this.getRedAutoScore(),
        quintetAchieved: false,
        teleopCargoPoints: this.redTeleCargoLow + (this.redTeleCargoHigh * 2),
        endgamePoints: this.getRedEndScore(),
        teleopPoints: this.getRedTeleScore(),
        cargoBonusRankingPoint: this.redCargoBonus,
        hangarBonusRankingPoint: this.redHangarBonus,
        foulCount: minRedPen,
        techFoulCount: majRedPen,
        adjustPoints: 0,
        foulPoints: this.getRedPenalty(minRedPen, majRedPen),
        rp: 0 + (this.redCargoBonus ? 1 : 0) + (this.redHangarBonus ? 1 : 0),
        totalPoints: this.getRedScore(minBluePen, majBluePen),
      },
      blue: {
        adjustPoints: 0,
        autoCargoLowerBlue: this.blueAutoCargoLow,
        autoCargoLowerFar: 0,
        autoCargoLowerNear: 0,
        autoCargoLowerRed: 0, // this.redAutoCargoLow,
        autoCargoPoints: (this.blueAutoCargoLow * 2) + (this.blueAutoCargoHigh * 4),
        autoCargoTotal: this.blueAutoCargoLow + this.blueAutoCargoHigh,
        autoCargoUpperBlue: this.blueAutoCargoHigh,
        autoCargoUpperFar: 0,
        autoCargoUpperNear: 0,
        autoCargoUpperRed: 0, // this.redAutoCargoHigh,
        autoPoints: this.getBlueAutoScore(),
        autoTaxiPoints: this.getBlueAutoScore() - ((this.blueAutoCargoLow * 2) + (this.blueAutoCargoHigh * 4)),
        cargoBonusRankingPoint: this.blueCargoBonus,
        endgamePoints: this.getBlueEndScore(),
        endgameRobot1: this.endStatusToString(this.blueHangerRobot1),
        endgameRobot2: this.endStatusToString(this.blueHangerRobot2),
        endgameRobot3: this.endStatusToString(this.blueHangerRobot3),
        foulCount: minRedPen,
        foulPoints: this.getBluePenalty(minRedPen, majRedPen),
        hangarBonusRankingPoint: this.blueHangarBonus,
        matchCargoTotal: this.blueAutoCargoHigh + this.blueAutoCargoLow + this.blueTeleCargoHigh + this.blueTeleCargoLow,
        quintetAchieved: false,
        rp: 0 + (this.blueCargoBonus ? 1 : 0) + (this.blueHangarBonus ? 1 : 0),
        taxiRobot1: this.blueAutoTaxiRobot1 ? "Yes" : "No",
        taxiRobot2: this.blueAutoTaxiRobot2 ? "Yes" : "No",
        taxiRobot3: this.blueAutoTaxiRobot3 ? "Yes" : "No",
        techFoulCount: majRedPen,
        teleopCargoLowerBlue: this.blueTeleCargoLow,
        teleopCargoLowerFar: 0,
        teleopCargoLowerNear: 0,
        teleopCargoLowerRed: 0, // this.redTeleCargoLow,
        teleopCargoPoints: this.blueTeleCargoLow + (this.blueTeleCargoHigh * 2),
        teleopCargoTotal: this.blueTeleCargoLow + this.blueTeleCargoHigh,
        teleopCargoUpperBlue: this.blueTeleCargoHigh,
        teleopCargoUpperFar: 0,
        teleopCargoUpperNear: 0,
        teleopCargoUpperRed: 0, // this.redTeleCargoHigh,
        teleopPoints: this.getBlueTeleScore(),
        totalPoints: this.getBlueScore(minRedPen, majRedPen),
      }
    }
  }

  public fromTBA(tba: any, matchKey: string): RapidReactMatchDetails {
    const details = new RapidReactMatchDetails();
    details.matchKey = matchKey;
    details.matchDetailKey = matchKey + "D";
    // Red
    details.redAutoTaxiRobot1 = tba.red.taxiRobot1 === "Yes";
    details.redAutoTaxiRobot2 = tba.red.taxiRobot2 === "Yes";
    details.redAutoTaxiRobot3 = tba.red.taxiRobot3 === "Yes";
    details.redAutoCargoLow = tba.red.autoCargoLowerRed;
    details.redAutoCargoHigh = tba.red.autoCargoUpperRed;
    details.redTeleCargoLow = tba.red.teleopCargoLowerRed;
    details.redTeleCargoHigh = tba.red.teleopCargoUpperRed;
    details.redHangerRobot1 = this.endStatusFromString(tba.red.endgameRobot1);
    details.redHangerRobot2 = this.endStatusFromString(tba.red.endgameRobot2);
    details.redHangerRobot3 = this.endStatusFromString(tba.red.endgameRobot3);
    details.redCargoBonus = tba.red.cargoBonusRankingPoint;
    details.redHangarBonus = tba.red.hangarBonusRankingPoint;
    // Blue
    details.blueAutoTaxiRobot1 = tba.blue.taxiRobot1 === "Yes";
    details.blueAutoTaxiRobot2 = tba.blue.taxiRobot2 === "Yes";
    details.blueAutoTaxiRobot3 = tba.blue.taxiRobot3 === "Yes";
    details.blueAutoCargoLow = tba.blue.autoCargoLowerBlue;
    details.blueAutoCargoHigh = tba.blue.autoCargoUpperBlue;
    details.blueTeleCargoLow = tba.blue.teleopCargoLowerBlue;
    details.blueTeleCargoHigh = tba.blue.teleopCargoUpperBlue;
    details.blueHangerRobot1 = this.endStatusFromString(tba.blue.endgameRobot1);
    details.blueHangerRobot2 = this.endStatusFromString(tba.blue.endgameRobot2);
    details.blueHangerRobot3 = this.endStatusFromString(tba.blue.endgameRobot3);
    details.blueCargoBonus = tba.blue.cargoBonusRankingPoint;
    details.blueHangarBonus = tba.blue.hangarBonusRankingPoint;
    return details;
  }

  public endStatusToString(ptValue: number): string {
    switch(ptValue) {
      case RapidReactMatchDetails.HANGAR_LOW: return "Low";
      case RapidReactMatchDetails.HANGAR_MID: return "Mid";
      case RapidReactMatchDetails.HANGAR_HIGH: return "High";
      case RapidReactMatchDetails.HANGAR_TRAVERSAL: return "Traversal";
      default: return "None";
    }
  }

  public endStatusFromString(stringValue: string): number {
    switch(stringValue) {
      case "Low": return RapidReactMatchDetails.HANGAR_LOW;
      case "Mid": return RapidReactMatchDetails.HANGAR_MID;
      case "High": return RapidReactMatchDetails.HANGAR_HIGH;
      case "Traversal": return RapidReactMatchDetails.HANGAR_TRAVERSAL;
      default: return 0;
    }
  }

  public getRedScore(minPen: number, majPen: number): number {
    return this.getRedAutoScore() + this.getRedTeleScore() + this.getRedEndScore() + this.getBluePenalty(minPen, majPen);
  }

  public getRedAutoScore(): number {
    let points: number = 0;
    points += this.redAutoTaxiRobot1 ? 2 : 0;
    points += this.redAutoTaxiRobot2 ? 2 : 0;
    points += this.redAutoTaxiRobot3 ? 2 : 0;
    points += this.redAutoCargoLow * 2;
    points += this.redAutoCargoHigh * 4;
    return points;
  }

  public getRedTeleScore(): number {
    let points: number = 0;
    points += this.redTeleCargoLow;
    points += this.redTeleCargoHigh * 2;
    return points;
  }

  public getRedEndScore(): number {
    let points: number = 0;
    points += this.redHangerRobot1;
    points += this.redHangerRobot2;
    points += this.redHangerRobot3;
    return points;
  }

  public getRedPenalty(minPen: number, majPen: number): number {
    return (minPen * 4) + (majPen * 8);
  }

  public getBlueScore(minPen: number, majPen: number): number {
    return this.getBlueAutoScore() + this.getBlueTeleScore() + this.getBlueEndScore() + this.getRedPenalty(minPen, majPen);
  }

  public getBlueAutoScore(): number {
    let points: number = 0;
    points += this.blueAutoTaxiRobot1 ? 2 : 0;
    points += this.blueAutoTaxiRobot2 ? 2 : 0;
    points += this.blueAutoTaxiRobot3 ? 2 : 0;
    points += this.blueAutoCargoLow * 2;
    points += this.blueAutoCargoHigh * 4;
    return points;
  }

  public getBlueTeleScore(): number {
    let points: number = 0;
    points += this.blueTeleCargoLow;
    points += this.blueTeleCargoHigh * 2;
    return points;
  }

  public getBlueEndScore(): number {
    let points: number = 0;
    points += this.blueHangerRobot1;
    points += this.blueHangerRobot2;
    points += this.blueHangerRobot3;
    return points;
  }

  public getBluePenalty(minPen: number, majPen: number): number {
    return (minPen * 4) + (majPen * 8);
  }

  get redAutoTaxiRobot1(): boolean {
    return this._redAutoTaxiRobot1;
  }

  set redAutoTaxiRobot1(value: boolean) {
    this._redAutoTaxiRobot1 = value;
  }

  get redAutoTaxiRobot2(): boolean {
    return this._redAutoTaxiRobot2;
  }

  set redAutoTaxiRobot2(value: boolean) {
    this._redAutoTaxiRobot2 = value;
  }

  get redAutoTaxiRobot3(): boolean {
    return this._redAutoTaxiRobot3;
  }

  set redAutoTaxiRobot3(value: boolean) {
    this._redAutoTaxiRobot3 = value;
  }

  get redAutoCargoLow(): number {
    return this._redAutoCargoLow;
  }

  set redAutoCargoLow(value: number) {
    this._redAutoCargoLow = value;
  }

  get redAutoCargoHigh(): number {
    return this._redAutoCargoHigh;
  }

  set redAutoCargoHigh(value: number) {
    this._redAutoCargoHigh = value;
  }

  get redTeleCargoLow(): number {
    return this._redTeleCargoLow;
  }

  set redTeleCargoLow(value: number) {
    this._redTeleCargoLow = value;
  }

  get redTeleCargoHigh(): number {
    return this._redTeleCargoHigh;
  }

  set redTeleCargoHigh(value: number) {
    this._redTeleCargoHigh = value;
  }

  get redHangerRobot1(): number {
    return this._redHangerRobot1;
  }

  set redHangerRobot1(value: number) {
    this._redHangerRobot1 = value;
  }

  get redHangerRobot2(): number {
    return this._redHangerRobot2;
  }

  set redHangerRobot2(value: number) {
    this._redHangerRobot2 = value;
  }

  get redHangerRobot3(): number {
    return this._redHangerRobot3;
  }

  set redHangerRobot3(value: number) {
    this._redHangerRobot3 = value;
  }

  get redCargoBonus(): boolean {
    return this._redCargoBonus;
  }

  set redCargoBonus(value: boolean) {
    this._redCargoBonus = value;
  }

  get redHangarBonus(): boolean {
    return this._redHangarBonus;
  }

  set redHangarBonus(value: boolean) {
    this._redHangarBonus = value;
  }

  get blueAutoTaxiRobot1(): boolean {
    return this._blueAutoTaxiRobot1;
  }

  set blueAutoTaxiRobot1(value: boolean) {
    this._blueAutoTaxiRobot1 = value;
  }

  get blueAutoTaxiRobot2(): boolean {
    return this._blueAutoTaxiRobot2;
  }

  set blueAutoTaxiRobot2(value: boolean) {
    this._blueAutoTaxiRobot2 = value;
  }

  get blueAutoTaxiRobot3(): boolean {
    return this._blueAutoTaxiRobot3;
  }

  set blueAutoTaxiRobot3(value: boolean) {
    this._blueAutoTaxiRobot3 = value;
  }

  get blueAutoCargoLow(): number {
    return this._blueAutoCargoLow;
  }

  set blueAutoCargoLow(value: number) {
    this._blueAutoCargoLow = value;
  }

  get blueAutoCargoHigh(): number {
    return this._blueAutoCargoHigh;
  }

  set blueAutoCargoHigh(value: number) {
    this._blueAutoCargoHigh = value;
  }

  get blueTeleCargoLow(): number {
    return this._blueTeleCargoLow;
  }

  set blueTeleCargoLow(value: number) {
    this._blueTeleCargoLow = value;
  }

  get blueTeleCargoHigh(): number {
    return this._blueTeleCargoHigh;
  }

  set blueTeleCargoHigh(value: number) {
    this._blueTeleCargoHigh = value;
  }

  get blueHangerRobot1(): number {
    return this._blueHangerRobot1;
  }

  set blueHangerRobot1(value: number) {
    this._blueHangerRobot1 = value;
  }

  get blueHangerRobot2(): number {
    return this._blueHangerRobot2;
  }

  set blueHangerRobot2(value: number) {
    this._blueHangerRobot2 = value;
  }

  get blueHangerRobot3(): number {
    return this._blueHangerRobot3;
  }

  set blueHangerRobot3(value: number) {
    this._blueHangerRobot3 = value;
  }

  get blueCargoBonus(): boolean {
    return this._blueCargoBonus;
  }

  set blueCargoBonus(value: boolean) {
    this._blueCargoBonus = value;
  }

  get blueHangarBonus(): boolean {
    return this._blueHangarBonus;
  }

  set blueHangarBonus(value: boolean) {
    this._blueHangarBonus = value;
  }
}

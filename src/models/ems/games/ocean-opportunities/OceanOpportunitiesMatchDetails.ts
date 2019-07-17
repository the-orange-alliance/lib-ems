import MatchDetails from "../../MatchDetails";
import IPostableObject from "../../../IPostableObject";

export default class OceanOpportunitiesMatchDetails  extends MatchDetails implements IPostableObject {

  private _redProcessingBargeReuse: number;
  private _redProcessingBargeRecycle: number;
  private _redProcessingBargeRecovery: number;
  private _redReductionProcessing: number;
  private _redEndRobotOneDocking: number;
  private _redEndRobotTwoDocking: number;
  private _redEndRobotThreeDocking: number;
  private _blueProcessingBargeReuse: number;
  private _blueProcessingBargeRecycle: number;
  private _blueProcessingBargeRecovery: number;
  private _blueReductionProcessing: number;
  private _blueEndRobotOneDocking: number;
  private _blueEndRobotTwoDocking: number;
  private _blueEndRobotThreeDocking: number;
  private _coopertitionBonus: boolean;

  constructor() {
    super();
    this._redProcessingBargeReuse = 0;
    this._redProcessingBargeRecycle = 0;
    this._redProcessingBargeRecovery = 0;
    this._redReductionProcessing = 0;
    this._redEndRobotOneDocking = 0;
    this._redEndRobotTwoDocking = 0;
    this._redEndRobotThreeDocking = 0;
    this._blueProcessingBargeReuse = 0;
    this._blueProcessingBargeRecycle = 0;
    this._blueProcessingBargeRecovery = 0;
    this._blueReductionProcessing = 0;
    this._blueEndRobotOneDocking = 0;
    this._blueEndRobotTwoDocking = 0;
    this._blueEndRobotThreeDocking = 0;
    this._coopertitionBonus = false;
  }

  public toJSON(): object {
    return {
      match_key: this.matchKey,
      match_detail_key: this.matchDetailKey,
      red_processing_barge_reuse: this.redProcessingBargeReuse,
      red_processing_barge_recycle: this.redProcessingBargeRecycle,
      red_processing_barge_recovery: this.redProcessingBargeRecovery,
      red_reduction_processing: this.redReductionProcessing,
      red_end_robot_one_docking: this.redEndRobotOneDocking,
      red_end_robot_two_docking: this.redEndRobotTwoDocking,
      red_end_robot_three_docking: this.redEndRobotTwoDocking,
      blue_processing_barge_reuse: this.blueProcessingBargeReuse,
      blue_processing_barge_recycle: this.blueProcessingBargeRecycle,
      blue_processing_barge_recovery: this.blueProcessingBargeRecovery,
      blue_reduction_processing: this.blueReductionProcessing,
      blue_end_robot_one_docking: this.blueEndRobotOneDocking,
      blue_end_robot_two_docking: this.blueEndRobotTwoDocking,
      blue_end_robot_three_docking: this.blueEndRobotTwoDocking,
      coopertition_bonus: this.coopertitionBonus ? 1 : 0
    };
  }

  public fromJSON(json: any): OceanOpportunitiesMatchDetails {
    const matchDetails: OceanOpportunitiesMatchDetails = new OceanOpportunitiesMatchDetails();
    matchDetails.matchKey = json.match_key;
    matchDetails.matchDetailKey = json.match_detail_key;
    matchDetails.redProcessingBargeReuse = json.red_processing_barge_reuse;
    matchDetails.redProcessingBargeRecycle = json.red_processing_barge_recycle;
    matchDetails.redProcessingBargeRecovery = json.red_processing_barge_recovery;
    matchDetails.redReductionProcessing = json.red_reduction_processing;
    matchDetails.redEndRobotOneDocking = json.red_end_robot_one_docking;
    matchDetails.redEndRobotTwoDocking = json.red_end_robot_two_docking;
    matchDetails.redEndRobotThreeDocking = json.red_end_robot_three_docking;
    matchDetails.blueProcessingBargeReuse = json.blue_processing_barge_reuse;
    matchDetails.blueProcessingBargeRecycle = json.blue_processing_barge_recycle;
    matchDetails.blueProcessingBargeRecovery = json.blue_processing_barge_recovery;
    matchDetails.blueReductionProcessing = json.blue_reduction_processing;
    matchDetails.blueEndRobotOneDocking = json.blue_end_robot_one_docking;
    matchDetails.blueEndRobotTwoDocking = json.blue_end_robot_two_docking;
    matchDetails.blueEndRobotThreeDocking = json.blue_end_robot_three_docking;
    matchDetails.coopertitionBonus = json.coopertition_bonis === 1;
    return matchDetails;
  }

  public getRedTeleScore(): number {
    let sum: number = 0;
    sum += this.redProcessingBargeReuse * 6;
    sum += this.redProcessingBargeRecovery * 3;
    sum += this.redProcessingBargeRecycle * 2;
    sum += this.redReductionProcessing;
    return sum;
  }

  public getRedEndScore(): number {
    let sum: number = 0;
    sum += this.getDockingPoints(this.redEndRobotOneDocking);
    sum += this.getDockingPoints(this.redEndRobotTwoDocking);
    sum += this.getDockingPoints(this.redEndRobotThreeDocking);
    return sum;
  }

  public getRedPenalty(minPen: number, majPen: number): number {
    return majPen * 10;
  }

  public getRedScore(minPen: number, majPen: number): number {
    return this.getRedTeleScore() + this.getRedEndScore() + this.getBluePenalty(minPen, majPen);
  }

  public getBlueTeleScore(): number {
    let sum: number = 0;
    sum += this.blueProcessingBargeReuse * 6;
    sum += this.blueProcessingBargeRecovery * 3;
    sum += this.redProcessingBargeRecycle * 2;
    sum += this.redReductionProcessing;
    return sum;
  }

  public getBlueEndScore(): number {
    let sum: number = 0;
    sum += this.getDockingPoints(this.blueEndRobotOneDocking);
    sum += this.getDockingPoints(this.blueEndRobotTwoDocking);
    sum += this.getDockingPoints(this.blueEndRobotThreeDocking);
    return sum;
  }

  public getBluePenalty(minPen: number, majPen: number): number {
    return majPen * 10;
  }

  public getBlueScore(minPen: number, majPen: number): number {
    return this.getBlueTeleScore() + this.getBlueEndScore() + this.getRedPenalty(minPen, majPen);
  }

  private getDockingPoints(state: number): number {
    if (state === 1) {
      return 5;
    } else if (state === 2) {
      return 10;
    } else if (state === 3) {
      return 20;
    } else {
      return 0;
    }
  }

  get redProcessingBargeReuse(): number {
    return this._redProcessingBargeReuse;
  }

  set redProcessingBargeReuse(value: number) {
    this._redProcessingBargeReuse = value;
  }

  get redProcessingBargeRecycle(): number {
    return this._redProcessingBargeRecycle;
  }

  set redProcessingBargeRecycle(value: number) {
    this._redProcessingBargeRecycle = value;
  }

  get redProcessingBargeRecovery(): number {
    return this._redProcessingBargeRecovery;
  }

  set redProcessingBargeRecovery(value: number) {
    this._redProcessingBargeRecovery = value;
  }

  get redReductionProcessing(): number {
    return this._redReductionProcessing;
  }

  set redReductionProcessing(value: number) {
    this._redReductionProcessing = value;
  }

  get redEndRobotOneDocking(): number {
    return this._redEndRobotOneDocking;
  }

  set redEndRobotOneDocking(value: number) {
    this._redEndRobotOneDocking = value;
  }

  get redEndRobotTwoDocking(): number {
    return this._redEndRobotTwoDocking;
  }

  set redEndRobotTwoDocking(value: number) {
    this._redEndRobotTwoDocking = value;
  }

  get redEndRobotThreeDocking(): number {
    return this._redEndRobotThreeDocking;
  }

  set redEndRobotThreeDocking(value: number) {
    this._redEndRobotThreeDocking = value;
  }

  get blueProcessingBargeReuse(): number {
    return this._blueProcessingBargeReuse;
  }

  set blueProcessingBargeReuse(value: number) {
    this._blueProcessingBargeReuse = value;
  }

  get blueProcessingBargeRecycle(): number {
    return this._blueProcessingBargeRecycle;
  }

  set blueProcessingBargeRecycle(value: number) {
    this._blueProcessingBargeRecycle = value;
  }

  get blueProcessingBargeRecovery(): number {
    return this._blueProcessingBargeRecovery;
  }

  set blueProcessingBargeRecovery(value: number) {
    this._blueProcessingBargeRecovery = value;
  }

  get blueReductionProcessing(): number {
    return this._blueReductionProcessing;
  }

  set blueReductionProcessing(value: number) {
    this._blueReductionProcessing = value;
  }

  get blueEndRobotOneDocking(): number {
    return this._blueEndRobotOneDocking;
  }

  set blueEndRobotOneDocking(value: number) {
    this._blueEndRobotOneDocking = value;
  }

  get blueEndRobotTwoDocking(): number {
    return this._blueEndRobotTwoDocking;
  }

  set blueEndRobotTwoDocking(value: number) {
    this._blueEndRobotTwoDocking = value;
  }

  get blueEndRobotThreeDocking(): number {
    return this._blueEndRobotThreeDocking;
  }

  set blueEndRobotThreeDocking(value: number) {
    this._blueEndRobotThreeDocking = value;
  }

  get coopertitionBonus(): boolean {
    return this._coopertitionBonus;
  }

  set coopertitionBonus(value: boolean) {
    this._coopertitionBonus = value;
  }
}
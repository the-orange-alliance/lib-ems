import MatchDetails from "../../MatchDetails";
import IPostableObject from "../../../IPostableObject";

export default class InfiniteRechargeMatchDetails extends MatchDetails implements IPostableObject {

  public static STATUS_NONE: number = 0;
  public static STATUS_PARKED: number = 1;
  public static STATUS_HANGING: number = 2;

  private _redAutoBottomCells: number;
  private _redAutoOuterCells: number;
  private _redAutoInnerCells: number;
  private _redAutoRobotOneCrossed: boolean;
  private _redAutoRobotTwoCrossed: boolean;
  private _redAutoRobotThreeCrossed: boolean;
  private _redTeleBottomCells: number;
  private _redTeleOuterCells: number;
  private _redTeleInnerCells: number;
  private _redEndRobotOneStatus: number;
  private _redEndRobotTwoStatus: number;
  private _redEndRobotThreeStatus: number;
  private _redEndEqualized: boolean;
  private _redStageOneCells: number;
  private _redStageTwoCells: number;
  private _redStageThreeCells: number;
  private _redRotationControl: boolean;
  private _redPositionControl: boolean;
  private _redStage: number;

  private _blueAutoBottomCells: number;
  private _blueAutoOuterCells: number;
  private _blueAutoInnerCells: number;
  private _blueAutoRobotOneCrossed: boolean;
  private _blueAutoRobotTwoCrossed: boolean;
  private _blueAutoRobotThreeCrossed: boolean;
  private _blueTeleBottomCells: number;
  private _blueTeleOuterCells: number;
  private _blueTeleInnerCells: number;
  private _blueEndRobotOneStatus: number;
  private _blueEndRobotTwoStatus: number;
  private _blueEndRobotThreeStatus: number;
  private _blueEndEqualized: boolean;
  private _blueStageOneCells: number;
  private _blueStageTwoCells: number;
  private _blueStageThreeCells: number;
  private _blueRotationControl: boolean;
  private _bluePositionControl: boolean;
  private _blueStage: number;

  constructor() {
    super();
    this._redAutoBottomCells = 0;
    this._redAutoOuterCells = 0;
    this._redAutoInnerCells = 0;
    this._redAutoRobotOneCrossed = false;
    this._redAutoRobotTwoCrossed = false;
    this._redAutoRobotThreeCrossed = false;
    this._redTeleBottomCells = 0;
    this._redTeleOuterCells = 0;
    this._redTeleInnerCells = 0;
    this._redEndRobotOneStatus = 0;
    this._redEndRobotTwoStatus = 0;
    this._redEndRobotThreeStatus= 0;
    this._redEndEqualized = false;
    this._redStageOneCells = 0;
    this._redStageTwoCells = 0;
    this._redStageThreeCells = 0;
    this._redRotationControl = false;
    this._redPositionControl = false;
    this._redStage = 0;
    this._blueAutoBottomCells = 0;
    this._blueAutoOuterCells = 0;
    this._blueAutoInnerCells = 0;
    this._blueAutoRobotOneCrossed = false;
    this._blueAutoRobotTwoCrossed = false;
    this._blueAutoRobotThreeCrossed = false;
    this._blueTeleBottomCells = 0;
    this._blueTeleOuterCells = 0;
    this._blueTeleInnerCells = 0;
    this._blueEndRobotOneStatus = 0;
    this._blueEndRobotTwoStatus = 0;
    this._blueEndRobotThreeStatus = 0;
    this._blueEndEqualized = false;
    this._blueStageOneCells = 0;
    this._blueStageTwoCells = 0;
    this._blueStageThreeCells = 0;
    this._blueRotationControl = false;
    this._bluePositionControl = false;
    this._blueStage = 0;
  }

  public toJSON(): object {
    return {
      match_key: this.matchKey,
      match_detail_key: this.matchDetailKey,
      red_auto_bottom_cells: this.redAutoBottomCells,
      red_auto_outer_cells: this.redAutoOuterCells,
      red_auto_inner_cells: this.redAutoInnerCells,
      red_auto_robot_one_crossed: this.redAutoRobotOneCrossed ? 1 : 0,
      red_auto_robot_two_crossed: this.redAutoRobotTwoCrossed ? 1 : 0,
      red_auto_robot_three_crossed: this.redAutoRobotThreeCrossed ? 1 : 0,
      red_tele_bottom_cells: this.redTeleBottomCells,
      red_tele_outer_cells: this.redTeleOuterCells,
      red_tele_inner_cells: this.redTeleInnerCells,
      red_end_robot_one_status: this.redEndRobotOneStatus,
      red_end_robot_two_status: this.redEndRobotTwoStatus,
      red_end_robot_three_status: this.redEndRobotThreeStatus,
      red_end_equalized: this.redEndEqualized ? 1 : 0,
      red_stage_one_cells: this.redStageOneCells,
      red_stage_two_cells: this.redStageTwoCells,
      red_stage_three_cells: this.redStageThreeCells,
      red_rotation_control: this.redRotationControl ? 1 : 0,
      red_position_control: this.redPositionControl ? 1 : 0,
      red_stage: this.redStage,
      blue_auto_bottom_cells: this.blueAutoBottomCells,
      blue_auto_outer_cells: this.blueAutoOuterCells,
      blue_auto_inner_cells: this.blueAutoInnerCells,
      blue_auto_robot_one_crossed: this.blueAutoRobotOneCrossed ? 1 : 0,
      blue_auto_robot_two_crossed: this.blueAutoRobotTwoCrossed ? 1 : 0,
      blue_auto_robot_three_crossed: this.blueAutoRobotThreeCrossed ? 1 : 0,
      blue_tele_bottom_cells: this.blueTeleBottomCells,
      blue_tele_outer_cells: this.blueTeleOuterCells,
      blue_tele_inner_cells: this.blueTeleInnerCells,
      blue_end_robot_one_status: this.blueEndRobotOneStatus,
      blue_end_robot_two_status: this.blueEndRobotTwoStatus,
      blue_end_robot_three_status: this.blueEndRobotThreeStatus,
      blue_end_equalized: this.blueEndEqualized ? 1 : 0,
      blue_stage_one_cells: this.blueStageOneCells,
      blue_stage_two_cells: this.blueStageTwoCells,
      blue_stage_three_cells: this.blueStageThreeCells,
      blue_rotation_control: this.blueRotationControl ? 1 : 0,
      blue_position_control: this.bluePositionControl ? 1 : 0,
      blue_stage: this.blueStage,
    };
  }

  public fromJSON(json: any): InfiniteRechargeMatchDetails {
    const details: InfiniteRechargeMatchDetails = new InfiniteRechargeMatchDetails();
    details.matchKey = json.match_key;
    details.matchDetailKey = json.match_detail_key;
    details.redAutoBottomCells = json.red_auto_bottom_cells;
    details.redAutoOuterCells = json.red_auto_outer_cells;
    details.redAutoInnerCells = json.red_auto_inner_cells;
    details.redAutoRobotOneCrossed = json.red_auto_robot_one_crossed === 1;
    details.redAutoRobotTwoCrossed = json.red_auto_robot_two_crossed === 1;
    details.redAutoRobotThreeCrossed = json.red_auto_robot_three_crossed === 1;
    details.redTeleBottomCells = json.red_tele_bottom_cells;
    details.redTeleOuterCells = json.red_tele_outer_cells;
    details.redTeleInnerCells = json.red_tele_inner_cells;
    details.redEndRobotOneStatus = json.red_end_robot_one_status;
    details.redEndRobotTwoStatus = json.red_end_robot_two_status;
    details.redEndRobotThreeStatus= json.red_end_robot_three_status;
    details.redEndEqualized = json.red_end_equalized === 1;
    details.redStageOneCells = json.red_stage_one_cells;
    details.redStageTwoCells = json.red_stage_two_cells;
    details.redStageThreeCells = json.red_stage_three_cells;
    details.redRotationControl = json.red_rotation_control === 1;
    details.redPositionControl = json.red_position_control === 1;
    details.redStage = json.red_stage;
    details.blueAutoBottomCells = json.blue_auto_bottom_cells;
    details.blueAutoOuterCells = json.blue_auto_outer_cells;
    details.blueAutoInnerCells = json.blue_auto_inner_cells;
    details.blueAutoRobotOneCrossed = json.blue_auto_robot_one_crossed === 1;
    details.blueAutoRobotTwoCrossed = json.blue_auto_robot_two_crossed === 1;
    details.blueAutoRobotThreeCrossed = json.blue_auto_robot_three_crossed === 1;
    details.blueTeleBottomCells = json.blue_tele_bottom_cells;
    details.blueTeleOuterCells = json.blue_tele_outer_cells;
    details.blueTeleInnerCells = json.blue_tele_inner_cells;
    details.blueEndRobotOneStatus = json.blue_end_robot_one_status;
    details.blueEndRobotTwoStatus = json.blue_end_robot_two_status;
    details.blueEndRobotThreeStatus= json.blue_end_robot_three_status;
    details.blueEndEqualized = json.blue_end_equalized === 1;
    details.blueStageOneCells = json.blue_stage_one_cells;
    details.blueStageTwoCells = json.blue_stage_two_cells;
    details.blueStageThreeCells = json.blue_stage_three_cells;
    details.blueRotationControl = json.blue_rotation_control === 1;
    details.bluePositionControl = json.blue_position_control === 1;
    details.blueStage = json.blue_stage;
    return details;
  }

  public getRedScore(minPen: number, majPen: number): number {
    return this.getRedAutoScore() + this.getRedTeleScore() + this.getRedEndScore() + this.getBluePenalty(minPen, majPen);
  }

  public getRedAutoScore(): number {
    let points: number = 0;
    points += this.redAutoRobotOneCrossed ? 5 : 0;
    points += this.redAutoRobotTwoCrossed ? 5 : 0;
    points += this.redAutoRobotThreeCrossed ? 5 : 0;
    points += this.redAutoBottomCells * 2;
    points += this.redAutoOuterCells * 4;
    points += this.redAutoInnerCells * 6;
    return points;
  }

  public getRedTeleScore(): number {
    let points: number = 0;
    points += this.redTeleBottomCells;
    points += this.redTeleOuterCells * 2;
    points += this.redTeleInnerCells * 3;
    points += this.redRotationControl ? 10 : 0;
    points += this.redPositionControl ? 20 : 0;
    return points;
  }

  public getRedEndScore(): number {
    let points: number = 0;
    points += this.getEndStatusPoints(this.redEndRobotOneStatus);
    points += this.getEndStatusPoints(this.redEndRobotTwoStatus);
    points += this.getEndStatusPoints(this.redEndRobotThreeStatus);
    points += this.redEndEqualized ? 15 : 0;
    return points;
  }

  public getRedPenalty(minPen: number, majPen: number): number {
    return (minPen * 3) + (majPen * 15);
  }

  public getBlueScore(minPen: number, majPen: number): number {
    return this.getBlueAutoScore() + this.getBlueTeleScore() + this.getBlueEndScore() + this.getRedPenalty(minPen, majPen);
  }

  public getBlueAutoScore(): number {
    let points: number = 0;
    points += this.blueAutoRobotOneCrossed ? 5 : 0;
    points += this.blueAutoRobotTwoCrossed ? 5 : 0;
    points += this.blueAutoRobotThreeCrossed ? 5 : 0;
    points += this.blueAutoBottomCells * 2;
    points += this.blueAutoOuterCells * 4;
    points += this.blueAutoInnerCells * 6;
    return points;
  }

  public getBlueTeleScore(): number {
    let points: number = 0;
    points += this.blueTeleBottomCells;
    points += this.blueTeleOuterCells * 2;
    points += this.blueTeleInnerCells * 3;
    points += this.blueRotationControl ? 10 : 0;
    points += this.bluePositionControl ? 20 : 0;
    return points;
  }

  public getBlueEndScore(): number {
    let points: number = 0;
    points += this.getEndStatusPoints(this.blueEndRobotOneStatus);
    points += this.getEndStatusPoints(this.blueEndRobotTwoStatus);
    points += this.getEndStatusPoints(this.blueEndRobotThreeStatus);
    points += this.blueEndEqualized ? 15 : 0;
    return points;
  }

  public getBluePenalty(minPen: number, majPen: number): number {
    return (minPen * 3) + (majPen * 15);
  }

  private getEndStatusPoints(status: number): number {
    switch (status) {
      case InfiniteRechargeMatchDetails.STATUS_NONE:
        return 0;
      case InfiniteRechargeMatchDetails.STATUS_PARKED:
        return 5;
      case InfiniteRechargeMatchDetails.STATUS_HANGING:
        return 25;
      default:
        return 0;
    }
  }

  get redAutoBottomCells(): number {
    return this._redAutoBottomCells;
  }

  set redAutoBottomCells(value: number) {
    this._redAutoBottomCells = value;
  }

  get redAutoOuterCells(): number {
    return this._redAutoOuterCells;
  }

  set redAutoOuterCells(value: number) {
    this._redAutoOuterCells = value;
  }

  get redAutoInnerCells(): number {
    return this._redAutoInnerCells;
  }

  set redAutoInnerCells(value: number) {
    this._redAutoInnerCells = value;
  }

  get redAutoRobotOneCrossed(): boolean {
    return this._redAutoRobotOneCrossed;
  }

  set redAutoRobotOneCrossed(value: boolean) {
    this._redAutoRobotOneCrossed = value;
  }

  get redAutoRobotTwoCrossed(): boolean {
    return this._redAutoRobotTwoCrossed;
  }

  set redAutoRobotTwoCrossed(value: boolean) {
    this._redAutoRobotTwoCrossed = value;
  }

  get redAutoRobotThreeCrossed(): boolean {
    return this._redAutoRobotThreeCrossed;
  }

  set redAutoRobotThreeCrossed(value: boolean) {
    this._redAutoRobotThreeCrossed = value;
  }

  get redTeleBottomCells(): number {
    return this._redTeleBottomCells;
  }

  set redTeleBottomCells(value: number) {
    this._redTeleBottomCells = value;
  }

  get redTeleOuterCells(): number {
    return this._redTeleOuterCells;
  }

  set redTeleOuterCells(value: number) {
    this._redTeleOuterCells = value;
  }

  get redTeleInnerCells(): number {
    return this._redTeleInnerCells;
  }

  set redTeleInnerCells(value: number) {
    this._redTeleInnerCells = value;
  }

  get redEndRobotOneStatus(): number {
    return this._redEndRobotOneStatus;
  }

  set redEndRobotOneStatus(value: number) {
    this._redEndRobotOneStatus = value;
  }

  get redEndRobotTwoStatus(): number {
    return this._redEndRobotTwoStatus;
  }

  set redEndRobotTwoStatus(value: number) {
    this._redEndRobotTwoStatus = value;
  }

  get redEndRobotThreeStatus(): number {
    return this._redEndRobotThreeStatus;
  }

  set redEndRobotThreeStatus(value: number) {
    this._redEndRobotThreeStatus = value;
  }

  get redEndEqualized(): boolean {
    return this._redEndEqualized;
  }

  set redEndEqualized(value: boolean) {
    this._redEndEqualized = value;
  }

  get redStageOneCells(): number {
    return this._redStageOneCells;
  }

  set redStageOneCells(value: number) {
    this._redStageOneCells = value;
  }

  get redStageTwoCells(): number {
    return this._redStageTwoCells;
  }

  set redStageTwoCells(value: number) {
    this._redStageTwoCells = value;
  }

  get redStageThreeCells(): number {
    return this._redStageThreeCells;
  }

  set redStageThreeCells(value: number) {
    this._redStageThreeCells = value;
  }

  get redRotationControl(): boolean {
    return this._redRotationControl;
  }

  set redRotationControl(value: boolean) {
    this._redRotationControl = value;
  }

  get redPositionControl(): boolean {
    return this._redPositionControl;
  }

  set redPositionControl(value: boolean) {
    this._redPositionControl = value;
  }

  get redStage(): number {
    return this._redStage;
  }

  set redStage(value: number) {
    this._redStage = value;
  }

  get blueAutoBottomCells(): number {
    return this._blueAutoBottomCells;
  }

  set blueAutoBottomCells(value: number) {
    this._blueAutoBottomCells = value;
  }

  get blueAutoOuterCells(): number {
    return this._blueAutoOuterCells;
  }

  set blueAutoOuterCells(value: number) {
    this._blueAutoOuterCells = value;
  }

  get blueAutoInnerCells(): number {
    return this._blueAutoInnerCells;
  }

  set blueAutoInnerCells(value: number) {
    this._blueAutoInnerCells = value;
  }

  get blueAutoRobotOneCrossed(): boolean {
    return this._blueAutoRobotOneCrossed;
  }

  set blueAutoRobotOneCrossed(value: boolean) {
    this._blueAutoRobotOneCrossed = value;
  }

  get blueAutoRobotTwoCrossed(): boolean {
    return this._blueAutoRobotTwoCrossed;
  }

  set blueAutoRobotTwoCrossed(value: boolean) {
    this._blueAutoRobotTwoCrossed = value;
  }

  get blueAutoRobotThreeCrossed(): boolean {
    return this._blueAutoRobotThreeCrossed;
  }

  set blueAutoRobotThreeCrossed(value: boolean) {
    this._blueAutoRobotThreeCrossed = value;
  }

  get blueTeleBottomCells(): number {
    return this._blueTeleBottomCells;
  }

  set blueTeleBottomCells(value: number) {
    this._blueTeleBottomCells = value;
  }

  get blueTeleOuterCells(): number {
    return this._blueTeleOuterCells;
  }

  set blueTeleOuterCells(value: number) {
    this._blueTeleOuterCells = value;
  }

  get blueTeleInnerCells(): number {
    return this._blueTeleInnerCells;
  }

  set blueTeleInnerCells(value: number) {
    this._blueTeleInnerCells = value;
  }

  get blueEndRobotOneStatus(): number {
    return this._blueEndRobotOneStatus;
  }

  set blueEndRobotOneStatus(value: number) {
    this._blueEndRobotOneStatus = value;
  }

  get blueEndRobotTwoStatus(): number {
    return this._blueEndRobotTwoStatus;
  }

  set blueEndRobotTwoStatus(value: number) {
    this._blueEndRobotTwoStatus = value;
  }

  get blueEndRobotThreeStatus(): number {
    return this._blueEndRobotThreeStatus;
  }

  set blueEndRobotThreeStatus(value: number) {
    this._blueEndRobotThreeStatus = value;
  }

  get blueEndEqualized(): boolean {
    return this._blueEndEqualized;
  }

  set blueEndEqualized(value: boolean) {
    this._blueEndEqualized = value;
  }

  get blueStageOneCells(): number {
    return this._blueStageOneCells;
  }

  set blueStageOneCells(value: number) {
    this._blueStageOneCells = value;
  }

  get blueStageTwoCells(): number {
    return this._blueStageTwoCells;
  }

  set blueStageTwoCells(value: number) {
    this._blueStageTwoCells = value;
  }

  get blueStageThreeCells(): number {
    return this._blueStageThreeCells;
  }

  set blueStageThreeCells(value: number) {
    this._blueStageThreeCells = value;
  }

  get blueRotationControl(): boolean {
    return this._blueRotationControl;
  }

  set blueRotationControl(value: boolean) {
    this._blueRotationControl = value;
  }

  get bluePositionControl(): boolean {
    return this._bluePositionControl;
  }

  set bluePositionControl(value: boolean) {
    this._bluePositionControl = value;
  }

  get blueStage(): number {
    return this._blueStage;
  }

  set blueStage(value: number) {
    this._blueStage = value;
  }
}
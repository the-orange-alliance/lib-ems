import MatchDetails from "../../MatchDetails";
import IPostableObject from "../../../IPostableObject";

export default class DeepSpaceMatchDetails extends MatchDetails implements IPostableObject {
  private _redAllianceNullHatches: number;
  private _redAutoRobotOneHabitat: number;
  private _redAutoRobotTwoHabitat: number;
  private _redAutoRobotThreeHabitat: number;
  private _redTeleCargoShipPanels: number;
  private _redTeleCargoShipCargo: number;
  private _redTeleRocketOnePanels: number;
  private _redTeleRocketOneCargo: number;
  private _redTeleRocketTwoPanels: number;
  private _redTeleRocketTwoCargo: number;
  private _redEndRobotOneHabitat: number;
  private _redEndRobotTwoHabitat: number;
  private _redEndRobotThreeHabitat: number;
  private _redCompleteDocking: boolean;
  private _redCompleteRocket: boolean;
  private _blueAllianceNullHatches: number;
  private _blueAutoRobotOneHabitat: number;
  private _blueAutoRobotTwoHabitat: number;
  private _blueAutoRobotThreeHabitat: number;
  private _blueTeleCargoShipPanels: number;
  private _blueTeleCargoShipCargo: number;
  private _blueTeleRocketOnePanels: number;
  private _blueTeleRocketOneCargo: number;
  private _blueTeleRocketTwoPanels: number;
  private _blueTeleRocketTwoCargo: number;
  private _blueEndRobotOneHabitat: number;
  private _blueEndRobotTwoHabitat: number;
  private _blueEndRobotThreeHabitat: number;
  private _blueCompleteDocking: boolean;
  private _blueCompleteRocket: boolean;

  constructor() {
    super();
    this._redAllianceNullHatches = 0;
    this._redAutoRobotOneHabitat = 0;
    this._redAutoRobotTwoHabitat = 0;
    this._redAutoRobotThreeHabitat = 0;
    this._redTeleCargoShipPanels = 0;
    this._redTeleCargoShipCargo = 0;
    this._redTeleRocketOnePanels = 0;
    this._redTeleRocketOneCargo = 0;
    this._redTeleRocketTwoPanels = 0;
    this._redTeleRocketTwoCargo = 0;
    this._redEndRobotOneHabitat = 0;
    this._redEndRobotTwoHabitat = 0;
    this._redEndRobotThreeHabitat = 0;
    this._redCompleteDocking = false;
    this._redCompleteRocket = false;
    this._blueAllianceNullHatches = 0;
    this._blueAutoRobotOneHabitat = 0;
    this._blueAutoRobotTwoHabitat = 0;
    this._blueAutoRobotThreeHabitat = 0;
    this._blueTeleCargoShipPanels = 0;
    this._blueTeleCargoShipCargo = 0;
    this._blueTeleRocketOnePanels = 0;
    this._blueTeleRocketOneCargo = 0;
    this._blueTeleRocketTwoPanels = 0;
    this._blueTeleRocketTwoCargo = 0;
    this._blueEndRobotOneHabitat = 0;
    this._blueEndRobotTwoHabitat = 0;
    this._blueEndRobotThreeHabitat = 0;
    this._blueCompleteDocking = false;
    this._blueCompleteRocket = false;
  }

  public toJSON(): object {
    return {
      match_key: this.matchKey,
      match_detail_key: this.matchDetailKey,
      red_alliance_null_hatches: this.redAllianceNullHatches,
      red_auto_robot_one_hab: this.redAutoRobotOneHabitat,
      red_auto_robot_two_hab: this.redAutoRobotTwoHabitat,
      red_auto_robot_three_hab: this.redAutoRobotThreeHabitat,
      red_tele_cargo_ship_panels: this.redTeleCargoShipPanels,
      red_tele_cargo_ship_cargo: this.redTeleCargoShipCargo,
      red_tele_rocket_one_panels: this.redTeleRocketOnePanels,
      red_tele_rocket_one_cargo: this.redTeleRocketOneCargo,
      red_tele_rocket_two_panels: this.redTeleRocketTwoPanels,
      red_tele_rocket_two_cargo: this.redTeleRocketTwoCargo,
      red_end_robot_one_hab: this.redEndRobotOneHabitat,
      red_end_robot_two_hab: this.redEndRobotTwoHabitat,
      red_end_robot_three_hab: this.redEndRobotThreeHabitat,
      red_completed_docking: this.redCompleteDocking ? 1 : 0,
      red_completed_rocket: this.redCompleteRocket ? 1 : 0,
      blue_alliance_null_hatches: this.blueAllianceNullHatches,
      blue_auto_robot_one_hab: this.blueAutoRobotOneHabitat,
      blue_auto_robot_two_hab: this.blueAutoRobotTwoHabitat,
      blue_auto_robot_three_hab: this.blueAutoRobotThreeHabitat,
      blue_tele_cargo_ship_panels: this.blueTeleCargoShipPanels,
      blue_tele_cargo_ship_cargo: this.blueTeleCargoShipCargo,
      blue_tele_rocket_one_panels: this.blueTeleRocketOnePanels,
      blue_tele_rocket_one_cargo: this.blueTeleRocketOneCargo,
      blue_tele_rocket_two_panels: this.blueTeleRocketTwoPanels,
      blue_tele_rocket_two_cargo: this.blueTeleRocketTwoCargo,
      blue_end_robot_one_hab: this.blueEndRobotOneHabitat,
      blue_end_robot_two_hab: this.blueEndRobotTwoHabitat,
      blue_end_robot_three_hab: this.blueEndRobotThreeHabitat,
      blue_completed_docking: this.blueCompleteDocking ? 1 : 0,
      blue_completed_rocket: this.blueCompleteRocket ? 1 : 0
    };
  }

  public fromJSON(json: any): DeepSpaceMatchDetails {
    const details: DeepSpaceMatchDetails = new DeepSpaceMatchDetails();
    details.matchKey = json.match_key;
    details.matchDetailKey = json.match_detail_key;
    details.redAllianceNullHatches = json.red_alliance_null_hatches;
    details.redAutoRobotOneHabitat = json.red_auto_robot_one_hab;
    details.redAutoRobotTwoHabitat = json.red_auto_robot_two_hab;
    details.redAutoRobotThreeHabitat = json.red_auto_robot_three_hab;
    details.redTeleCargoShipPanels = json.red_tele_cargo_ship_panels;
    details.redTeleCargoShipCargo = json.red_tele_cargo_ship_cargo;
    details.redTeleRocketOnePanels = json.red_tele_rocket_one_panels;
    details.redTeleRocketOneCargo = json.red_tele_rocket_one_cargo;
    details.redTeleRocketTwoPanels = json.red_tele_rocket_two_panels;
    details.redTeleRocketTwoCargo = json.red_tele_rocket_two_cargo;
    details.redEndRobotOneHabitat = json.red_end_robot_one_hab;
    details.redEndRobotTwoHabitat = json.red_end_robot_two_hab;
    details.redEndRobotThreeHabitat = json.red_end_robot_three_hab;
    details.redCompleteDocking = json.red_completed_docking === 1;
    details.redCompleteRocket = json.red_completed_rocket === 1;
    details.blueAllianceNullHatches = json.blue_alliance_null_hatches;
    details.blueAutoRobotOneHabitat = json.blue_auto_robot_one_hab;
    details.blueAutoRobotTwoHabitat = json.blue_auto_robot_two_hab;
    details.blueAutoRobotThreeHabitat = json.blue_auto_robot_three_hab;
    details.blueTeleCargoShipPanels = json.blue_tele_cargo_ship_panels;
    details.blueTeleCargoShipCargo = json.blue_tele_cargo_ship_cargo;
    details.blueTeleRocketOnePanels = json.blue_tele_rocket_one_panels;
    details.blueTeleRocketOneCargo = json.blue_tele_rocket_one_cargo;
    details.blueTeleRocketTwoPanels = json.blue_tele_rocket_two_panels;
    details.blueTeleRocketTwoCargo = json.blue_tele_rocket_two_cargo;
    details.blueEndRobotOneHabitat = json.blue_end_robot_one_hab;
    details.blueEndRobotTwoHabitat = json.blue_end_robot_two_hab;
    details.blueEndRobotThreeHabitat = json.blue_end_robot_three_hab;
    details.blueCompleteDocking = json.blue_completed_docking === 1;
    details.blueCompleteRocket = json.blue_completed_rocket === 1;
    return details;
  }

  get redAllianceNullHatches(): number {
    return this._redAllianceNullHatches;
  }

  set redAllianceNullHatches(value: number) {
    this._redAllianceNullHatches = value;
  }

  get redAutoRobotOneHabitat(): number {
    return this._redAutoRobotOneHabitat;
  }

  set redAutoRobotOneHabitat(value: number) {
    this._redAutoRobotOneHabitat = value;
  }

  get redAutoRobotTwoHabitat(): number {
    return this._redAutoRobotTwoHabitat;
  }

  set redAutoRobotTwoHabitat(value: number) {
    this._redAutoRobotTwoHabitat = value;
  }

  get redAutoRobotThreeHabitat(): number {
    return this._redAutoRobotThreeHabitat;
  }

  set redAutoRobotThreeHabitat(value: number) {
    this._redAutoRobotThreeHabitat = value;
  }

  get redTeleCargoShipPanels(): number {
    return this._redTeleCargoShipPanels;
  }

  set redTeleCargoShipPanels(value: number) {
    this._redTeleCargoShipPanels = value;
  }

  get redTeleCargoShipCargo(): number {
    return this._redTeleCargoShipCargo;
  }

  set redTeleCargoShipCargo(value: number) {
    this._redTeleCargoShipCargo = value;
  }

  get redTeleRocketOnePanels(): number {
    return this._redTeleRocketOnePanels;
  }

  set redTeleRocketOnePanels(value: number) {
    this._redTeleRocketOnePanels = value;
  }

  get redTeleRocketOneCargo(): number {
    return this._redTeleRocketOneCargo;
  }

  set redTeleRocketOneCargo(value: number) {
    this._redTeleRocketOneCargo = value;
  }

  get redTeleRocketTwoPanels(): number {
    return this._redTeleRocketTwoPanels;
  }

  set redTeleRocketTwoPanels(value: number) {
    this._redTeleRocketTwoPanels = value;
  }

  get redTeleRocketTwoCargo(): number {
    return this._redTeleRocketTwoCargo;
  }

  set redTeleRocketTwoCargo(value: number) {
    this._redTeleRocketTwoCargo = value;
  }

  get redEndRobotOneHabitat(): number {
    return this._redEndRobotOneHabitat;
  }

  set redEndRobotOneHabitat(value: number) {
    this._redEndRobotOneHabitat = value;
  }

  get redEndRobotTwoHabitat(): number {
    return this._redEndRobotTwoHabitat;
  }

  set redEndRobotTwoHabitat(value: number) {
    this._redEndRobotTwoHabitat = value;
  }

  get redEndRobotThreeHabitat(): number {
    return this._redEndRobotThreeHabitat;
  }

  set redEndRobotThreeHabitat(value: number) {
    this._redEndRobotThreeHabitat = value;
  }

  get redCompleteDocking(): boolean {
    return this._redCompleteDocking;
  }

  set redCompleteDocking(value: boolean) {
    this._redCompleteDocking = value;
  }

  get redCompleteRocket(): boolean {
    return this._redCompleteRocket;
  }

  set redCompleteRocket(value: boolean) {
    this._redCompleteRocket = value;
  }

  get blueAllianceNullHatches(): number {
    return this._blueAllianceNullHatches;
  }

  set blueAllianceNullHatches(value: number) {
    this._blueAllianceNullHatches = value;
  }

  get blueAutoRobotOneHabitat(): number {
    return this._blueAutoRobotOneHabitat;
  }

  set blueAutoRobotOneHabitat(value: number) {
    this._blueAutoRobotOneHabitat = value;
  }

  get blueAutoRobotTwoHabitat(): number {
    return this._blueAutoRobotTwoHabitat;
  }

  set blueAutoRobotTwoHabitat(value: number) {
    this._blueAutoRobotTwoHabitat = value;
  }

  get blueAutoRobotThreeHabitat(): number {
    return this._blueAutoRobotThreeHabitat;
  }

  set blueAutoRobotThreeHabitat(value: number) {
    this._blueAutoRobotThreeHabitat = value;
  }

  get blueTeleCargoShipPanels(): number {
    return this._blueTeleCargoShipPanels;
  }

  set blueTeleCargoShipPanels(value: number) {
    this._blueTeleCargoShipPanels = value;
  }

  get blueTeleCargoShipCargo(): number {
    return this._blueTeleCargoShipCargo;
  }

  set blueTeleCargoShipCargo(value: number) {
    this._blueTeleCargoShipCargo = value;
  }

  get blueTeleRocketOnePanels(): number {
    return this._blueTeleRocketOnePanels;
  }

  set blueTeleRocketOnePanels(value: number) {
    this._blueTeleRocketOnePanels = value;
  }

  get blueTeleRocketOneCargo(): number {
    return this._blueTeleRocketOneCargo;
  }

  set blueTeleRocketOneCargo(value: number) {
    this._blueTeleRocketOneCargo = value;
  }

  get blueTeleRocketTwoPanels(): number {
    return this._blueTeleRocketTwoPanels;
  }

  set blueTeleRocketTwoPanels(value: number) {
    this._blueTeleRocketTwoPanels = value;
  }

  get blueTeleRocketTwoCargo(): number {
    return this._blueTeleRocketTwoCargo;
  }

  set blueTeleRocketTwoCargo(value: number) {
    this._blueTeleRocketTwoCargo = value;
  }

  get blueEndRobotOneHabitat(): number {
    return this._blueEndRobotOneHabitat;
  }

  set blueEndRobotOneHabitat(value: number) {
    this._blueEndRobotOneHabitat = value;
  }

  get blueEndRobotTwoHabitat(): number {
    return this._blueEndRobotTwoHabitat;
  }

  set blueEndRobotTwoHabitat(value: number) {
    this._blueEndRobotTwoHabitat = value;
  }

  get blueEndRobotThreeHabitat(): number {
    return this._blueEndRobotThreeHabitat;
  }

  set blueEndRobotThreeHabitat(value: number) {
    this._blueEndRobotThreeHabitat = value;
  }

  get blueCompleteDocking(): boolean {
    return this._blueCompleteDocking;
  }

  set blueCompleteDocking(value: boolean) {
    this._blueCompleteDocking = value;
  }

  get blueCompleteRocket(): boolean {
    return this._blueCompleteRocket;
  }

  set blueCompleteRocket(value: boolean) {
    this._blueCompleteRocket = value;
  }
}
import IPostableObject from "../IPostableObject";
import Region from "./Region";
import Season from "./Season";
import * as Regions from "../../data/Regions";
import * as Seasons from "../../data/Seasons";
import {EventType} from "../../";

export default class Event implements IPostableObject {

  private _season: Season;
  private _region: Region;
  private _eventType: EventType;
  private _eventTypeKey: string;
  private _eventCode: string;
  private _eventName: string;
  private _venue: string;
  private _city: string;
  private _stateProv: string;
  private _country: string;
  private _fieldCount: number;
  private _website: string;
  private _divisionName: string;
  private _startDate: Date;
  private _endDate: Date;

  constructor() {
    this._season = new Season(0, "");
    this._region = new Region("", "");
    this._eventType = "generic";
    this._eventTypeKey = "";
    this._eventCode = "";
    this._eventName = "";
    this._venue = "";
    this._city = "";
    this._stateProv = "";
    this._country = "";
    this._fieldCount = 0;
    this._website = "";
    this._divisionName = "";
    this._startDate = new Date(0);
    this._endDate = new Date(0);
  }

  public toJSON(): object {
    return {
      season_key: this.season.seasonKey,
      region_key: this.region.regionKey,
      event_type: this.eventType,
      event_type_key: this.eventTypeKey,
      event_key: this.eventKey,
      event_name: this.eventName,
      venue: this.venue,
      city: this.city,
      state_prov: this.stateProv,
      country: this.country,
      field_count: this.fieldCount,
      website: this.website,
      division_name: this.divisionName,
      start_date: this.startDate,
      end_date: this.endDate
    };
  }

  public fromJSON(json: any): Event {
    const e: Event = new Event();
    e.season = Seasons.getFromSeasonKey(json.season_key);
    e.region = Regions.getFromRegionKey(json.region_key);
    e.eventType = json.event_type;
    e.eventTypeKey = json.event_type_key;
    e.eventCode = json.event_key.split("-")[2];
    e.eventName = json.event_name;
    e.venue = json.venue;
    e.city = json.city;
    e.stateProv = json.state_prov;
    e.country = json.country;
    e.fieldCount = json.field_count;
    e.website = json.website;
    e.divisionName = json.division_name;
    e.startDate = new Date(json.start_date);
    e.endDate = new Date(json.end_date);
    return e;
  }

  get season(): Season {
    return this._season;
  }

  set season(value: Season) {
    this._season = value;
  }

  get region(): Region {
    return this._region;
  }

  set region(value: Region) {
    this._region = value;
  }

  get eventType(): EventType {
    return this._eventType;
  }

  set eventType(value: EventType) {
    this._eventType = value;
  }

  get eventTypeKey(): string {
    return this._eventTypeKey;
  }

  set eventTypeKey(value: string) {
    this._eventTypeKey = value;
  }

  get eventCode(): string {
    return this._eventCode;
  }

  set eventCode(value: string) {
    if (value.length < 5) { // TODO - Magic number!
      this._eventCode = value;
    }
  }

  get eventKey(): string {
    if (typeof this.season === "undefined" || typeof this.region === "undefined") {
      return "";
    } else {
      return this.season.seasonKey + "-" + this.region.regionKey + "-" + (this.eventCode || "");
    }
  }

  get eventName(): string {
    return this._eventName;
  }

  set eventName(value: string) {
    this._eventName = value;
  }

  get venue(): string {
    return this._venue;
  }

  set venue(value: string) {
    this._venue = value;
  }

  get city(): string {
    return this._city;
  }

  set city(value: string) {
    this._city = value;
  }

  get stateProv(): string {
    return this._stateProv;
  }

  set stateProv(value: string) {
    this._stateProv = value;
  }

  get country(): string {
    return this._country;
  }

  set country(value: string) {
    this._country = value;
  }

  get website(): string {
    return this._website;
  }

  set website(value: string) {
    this._website = value;
  }

  get fieldCount(): number {
    return this._fieldCount;
  }

  set fieldCount(value: number) {
    this._fieldCount = value;
  }

  get divisionName(): string {
    return this._divisionName;
  }

  set divisionName(value: string) {
    this._divisionName = value;
  }

  get startDate(): Date {
    return this._startDate;
  }

  set startDate(value: Date) {
    this._startDate = value;
  }

  get endDate(): Date {
    return this._endDate;
  }

  set endDate(value: Date) {
    this._endDate = value;
  }
}
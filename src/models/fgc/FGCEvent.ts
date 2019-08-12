import IPostableObject from "../IPostableObject";

export default class FGCEvent implements IPostableObject {
  private _eventKey: string;
  private _seasonKey: string;
  private _eventCode: string;
  private _eventName: string;
  private _city: string;
  private _stateProv: string;
  private _country: string;
  private _venue: string;

  constructor() {
    this._eventKey = "";
    this._seasonKey = "";
    this._eventCode = "";
    this._eventName = "";
    this._city = "";
    this._stateProv = "";
    this._country = "";
    this._venue = "";
  }

  public toJSON(): object {
    return {
      EventKey: this.eventKey,
      SeasonKey: this.seasonKey,
      EventCode: this.eventCode,
      EventName: this.eventName,
      City: this.city,
      StateProv: this.stateProv,
      Country: this.country,
      Venue: this.venue
    };
  }

  public fromJSON(json: any): FGCEvent {
    const event: FGCEvent = new FGCEvent();
    event.eventKey = json.EventKey;
    event.seasonKey = json.SeasonKey;
    event.eventCode = json.EventCode;
    event.eventName = json.EventName;
    event.city = json.City;
    event.stateProv = json.StateProv;
    event.country = json.Country;
    event.venue = json.Venue;
    return event;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get seasonKey(): string {
    return this._seasonKey;
  }

  set seasonKey(value: string) {
    this._seasonKey = value;
  }

  get eventCode(): string {
    return this._eventCode;
  }

  set eventCode(value: string) {
    this._eventCode = value;
  }

  get eventName(): string {
    return this._eventName;
  }

  set eventName(value: string) {
    this._eventName = value;
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

  get venue(): string {
    return this._venue;
  }

  set venue(value: string) {
    this._venue = value;
  }
}
import IPostableObject from "../IPostableObject";

export default class User implements IPostableObject {
  private _userId: number | null;       // for user
  private _ownerUserId: number | null;  // for api key
  private _username: string | null;     // for user
  private _password: string | null;     // for user
  private _description: string | null;  // for api key
  private _apiKey: string | null;       // for api key
  private _canControlMatch: boolean;
  private _canControlFms: boolean;
  private _canRef: boolean;
  private _canControlEvent: boolean;

  constructor() {
    this._userId = null;
    this._ownerUserId = null;
    this._username = null;
    this._description = null;
    this._apiKey = null;
    this._canControlMatch = false;
    this._canControlFms = false;
    this._canRef = false;
    this._canControlEvent = false;
  }

  public toJSON(): object {
    const base = {
      can_control_match: this.canControlMatch,
      can_control_fms: this.canControlFms,
      can_ref: this.canRef,
      can_control_event: this.canControlEvent,
    };
    if(this.isApiKey) {
      return {
        key: this.apiKey,
        owner_user_id: this.ownerUserId,
        description: this.description,
        ...base
      };
    } else {
      return {
        username: this.username,
        password: (this.password) ? this.password : undefined,
        user_id: this.userId,
        ...base
      };
    }

  }

  public fromJSON(json: any): User {
    const t: User = new User();
    if(json.key) {
      t.apiKey = json.key;
      t.ownerUserId = json.owner_user_id;
      t.description = json.description;
    } else {
      t.username = json.username;
      t.userId = json.user_id
    }
    t.canControlEvent = !!json.can_control_event;
    t.canRef = !!json.can_ref;
    t.canControlFms = !!json.can_control_fms;
    t.canControlMatch = !!json.can_control_match;
    return t;
  }

  get userId(): number | null {
    return this._userId;
  }

  set userId(value: number | null) {
    this._userId = value;
  }

  get ownerUserId(): number | null {
    return this._ownerUserId;
  }

  set ownerUserId(value: number | null) {
    this._ownerUserId = value;
  }

  get username(): string | null {
    return this._username;
  }

  set username(value: string | null) {
    this._username = value;
  }

  get password(): string | null {
    return this._password;
  }

  set password(value: string | null) {
    this._password = value;
  }

  get description(): string | null {
    return this._description;
  }

  set description(value: string | null) {
    this._description = value;
  }

  get canControlMatch(): boolean {
    return this._canControlMatch;
  }

  set canControlMatch(value: boolean) {
    this._canControlMatch = value;
  }

  get canControlFms(): boolean {
    return this._canControlFms;
  }

  set canControlFms(value: boolean) {
    this._canControlFms = value;
  }

  get canRef(): boolean {
    return this._canRef;
  }

  set canRef(value: boolean) {
    this._canRef = value;
  }

  get canControlEvent(): boolean {
    return this._canControlEvent;
  }

  set canControlEvent(value: boolean) {
    this._canControlEvent = value;
  }

  get isApiKey(): boolean {
    return this.apiKey !== null || this.ownerUserId !== null || this.description !== null;
  }

  get apiKey(): string | null {
    return this._apiKey;
  }

  set apiKey(value: string | null) {
    this._apiKey = value;
  }
}

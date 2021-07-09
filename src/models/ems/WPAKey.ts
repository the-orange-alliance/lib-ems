import IPostableObject from "../IPostableObject";

export default class WPAKey implements IPostableObject {
  private _teamKey: number;
  private _wpaKey: string;

  constructor() {
    this.teamKey = 0;
    this.wpaKey = "";
  }

  public toJSON(): object {
    return {
      team_key: this.teamKey,
      wpa_key: this.wpaKey,
    };
  }

  public fromJSON(json: any): WPAKey {
    const t: WPAKey = new WPAKey();
    t.teamKey = json.team_key;
    t.wpaKey = json.wpa_key;
    return t;
  }

  get teamKey(): number {
    return this._teamKey;
  }

  set teamKey(value: number) {
    this._teamKey = value;
  }

  get wpaKey(): string {
    return this._wpaKey;
  }

  set wpaKey(value: string) {
    this._wpaKey = value;
  }

}

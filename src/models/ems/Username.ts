import IPostableObject from "../IPostableObject";

export default class Username implements IPostableObject {
  private _username: string;

  constructor() {
    this._username = "";
  }

  public toJSON(): object {
    return {
      username: this.username,
    };
  }

  public fromJSON(json: any): Username {
    const t: Username = new Username();
    t.username = json.username;
    return t;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}

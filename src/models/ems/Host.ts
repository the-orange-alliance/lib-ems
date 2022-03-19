import IPostableObject from "../IPostableObject";

export default class Host implements IPostableObject {
  private _host: string;

  constructor(host: string) {
    this._host = host;
  }

  public toJSON(): object {
    if(this.host && this.host.length > 0) {
      return {
        host: this.host
      };
    } else {
      return {};
    }

  }

  public fromJSON(json: any): Host {
    return new Host(json.host);
  }

  get host(): string {
    return this._host;
  }

  set host(value: string) {
    this._host = value;
  }
}
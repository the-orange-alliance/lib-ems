import IPostableObject from "../IPostableObject";

export default class TBAConfig implements IPostableObject {
  private _secret: string;
  private _clientId:  string;

  constructor() {
    this._secret = "";
    this._clientId = "";
  }

  public toJSON(): object {
    return {
      secret: this.secret,
      client_id: this.clientId
    };
  }

  public fromJSON(json: any): TBAConfig {
    const config: TBAConfig = new TBAConfig();
    config.secret = json.secret;
    config.clientId = json.client_id;
    return config;
  }

  get secret(): string {
    return this._secret;
  }

  set secret(value: string) {
    this._secret = value;
  }

  get clientId(): string {
    return this._clientId;
  }

  set clientId(value: string) {
    this._clientId = value;
  }
}
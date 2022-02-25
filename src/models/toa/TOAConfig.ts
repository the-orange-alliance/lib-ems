import IPostableObject from "../IPostableObject";

export default class TOAConfig implements IPostableObject {
  private _apiKey: string;

  constructor() {
    this._apiKey = "";
  }

  public toJSON(): object {
    return {
      api_key: this.apiKey
    };
  }

  public fromJSON(json: any): TOAConfig {
    const config: TOAConfig = new TOAConfig();
    config.apiKey = json.api_key || "";
    return config;
  }

  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(value: string) {
    this._apiKey = value;
  }
}
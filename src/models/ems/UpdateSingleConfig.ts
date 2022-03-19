import IPostableObject from "../IPostableObject";

export default class UpdateSingleConfig implements IPostableObject {
  private _key: string;
  private _data: any;


  constructor(key: string, data: any) {
    this._key = key;
    this._data = data;
  }

  public toJSON(): object {
    return {
      key: this.key,
      data: this.data
    }
  }

  public fromJSON(json: any): UpdateSingleConfig {
    return new UpdateSingleConfig(json.key, json.data);
  }

  get key(): string {
    return this._key;
  }

  set key(value: string) {
    this._key = value;
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }
}
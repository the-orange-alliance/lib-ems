import IPostableObject from "../IPostableObject";

export default class CustomData implements IPostableObject {

  private _data: any;

  constructor(data: any) {
    this._data = data;
  }

  public toJSON(): object {
    return this.data;
  }

  public fromJSON(json: any): CustomData {
    return new CustomData(json);
  }

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }
}
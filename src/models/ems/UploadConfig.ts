import IPostableObject from "../IPostableObject";
import {TOAConfig} from "../toa";
import TBAConfig from "../tba/TBAConfig";

export default class UploadConfig implements IPostableObject {
  private _eventKey: string;
  private _enabled: boolean;
  private _toaConfig: TOAConfig;
  private _tbaConfig: TBAConfig;
  private _customConfig: {apiUrl: string};

  constructor() {
    this.eventKey = "";
    this.enabled = false;
    this.toaConfig = new TOAConfig();
    this.tbaConfig = new TBAConfig();
    this.customConfig = {apiUrl: ''}
  }

  public toJSON(): object {
    return {
      event_key: this.eventKey,
      enabled: this.enabled,
      toa_config: this.toaConfig.toJSON(),
      tba_config: this.tbaConfig.toJSON(),
      custom_config: this.customConfig
    };
  }

  public fromJSON(json: any): UploadConfig {
    const t: UploadConfig = new UploadConfig();
    t.eventKey = json.event_key;
    t.enabled = t.eventKey && json.enabled;
    t.toaConfig = new TOAConfig().fromJSON(json.toa_config);
    t.tbaConfig = new TBAConfig().fromJSON(json.tba_config);
    t.customConfig = json.custom_config;
    return t;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get enabled(): boolean {
    return this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get toaConfig(): TOAConfig {
    return this._toaConfig;
  }

  set toaConfig(value: TOAConfig) {
    this._toaConfig = value;
  }

  get tbaConfig(): TBAConfig {
    return this._tbaConfig;
  }

  set tbaConfig(value: TBAConfig) {
    this._tbaConfig = value;
  }

  get customConfig(): { apiUrl: string } {
    return this._customConfig;
  }

  set customConfig(value: { apiUrl: string }) {
    this._customConfig = value;
  }
}

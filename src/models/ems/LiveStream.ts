import IPostableObject from "../IPostableObject";

export default class LiveStream implements IPostableObject {
  private _streamKey: string;
  private _eventKey: string;
  private _streamName: string;
  private _streamType: number;
  private _streamURL: string;
  private _channelName: string;
  private _channelURL: string;
  private _isActive: number;

  constructor() {
    this._streamKey = "";
    this._eventKey = "";
    this._streamName = "";
    this._streamType = 0;
    this._streamURL = "";
    this._channelName = "";
    this._channelURL = "";
    this._isActive = 0;
  }

  public toJSON(): object {
    return {
      live_stream_key: this.streamKey,
      event_key: this.eventKey,
      stream_name: this.streamName,
      stream_type: this.streamType,
      stream_url: this.streamURL,
      channel_name: this.channelName,
      channel_url: this.channelURL,
      is_active: this.isActive
    };
  }

  public fromJSON(json: any): LiveStream {
    const stream: LiveStream = new LiveStream();
    stream.streamKey = json.live_stream_key;
    stream.eventKey = json.event_key;
    stream.streamName = json.stream_name;
    stream.streamType = json.stream_type;
    stream.streamURL = json.stream_url;
    stream.channelName = json.channel_name;
    stream.channelURL = json.channel_url;
    stream.isActive = json.is_active;
    return stream;
  }

  get streamKey(): string {
    return this._streamKey;
  }

  set streamKey(value: string) {
    this._streamKey = value;
  }

  get eventKey(): string {
    return this._eventKey;
  }

  set eventKey(value: string) {
    this._eventKey = value;
  }

  get streamName(): string {
    return this._streamName;
  }

  set streamName(value: string) {
    this._streamName = value;
  }

  get streamType(): number {
    return this._streamType;
  }

  set streamType(value: number) {
    this._streamType = value;
  }

  get streamURL(): string {
    return this._streamURL;
  }

  set streamURL(value: string) {
    this._streamURL = value;
  }

  get channelName(): string {
    return this._channelName;
  }

  set channelName(value: string) {
    this._channelName = value;
  }

  get channelURL(): string {
    return this._channelURL;
  }

  set channelURL(value: string) {
    this._channelURL = value;
  }

  get isActive(): number {
    return this._isActive;
  }

  set isActive(value: number) {
    this._isActive = value;
  }
}
import * as socket from "socket.io-client";
import EMSProvider from "./EMSProvider";

class SocketProvider {
  private static _instance: SocketProvider;
  private _client: SocketIOClient.Socket;
  private _emsToFollow: typeof EMSProvider;

  public static getInstance(): SocketProvider {
    if (typeof SocketProvider._instance === "undefined") {
      SocketProvider._instance = new SocketProvider();
    }
    return SocketProvider._instance;
  }

  private constructor() {}

  /**
   * Initialize Socket. Port is set through the Environment variable `process.env.REACT_APP_EMS_SCK_PORT`
   * @param host EMS Socket Server URL (e.g. 10.0.100.5)
   * @param emsToFollow EMSProvider to follow for Authorization headers
   */
  public initialize(host: string, emsToFollow: typeof EMSProvider) {
    this._emsToFollow = emsToFollow;

    if (typeof this._client !== "undefined") {
      this._client.close();
    }

    // Connect to server
    this._client = socket(`http://${host}:${process.env.REACT_APP_EMS_SCK_PORT}/`, {
      query: {authorization: `Bearer ${emsToFollow.getAuthorization()}`}
    });
    this._client.open();

    // Update authorization every time we reconnect because it may have changed (renewed)
    this._client.on('reconnect_attempt', () => {
      this._client.io.opts.query = {authorization: `Bearer ${emsToFollow.getAuthorization()}`};
    });
  }

  public reconnect(): void {
    this._client.disconnect();
    this._client.io.opts.query = {authorization: `Bearer ${this._emsToFollow.getAuthorization()}`};
    this._client.open();
  }

  public emit(event: string, ...args: any[]): void {
    if (typeof this._client !== "undefined") {
      this._client.emit(event, ...args);
    }
  }

  public send(event: string, arg: any): void {
    if (typeof this._client !== "undefined") {
      this._client.emit(event, arg);
    }
  }

  public on(event: string, listener: (...args: any[]) => any) {
    if (typeof this._client !== "undefined") {
      this._client.on(event, listener);
    }
  }

  public once(event: string, listener: (...args: any[]) => any) {
    if (typeof this._client !== "undefined") {
      this._client.once(event, listener);
    }
  }

  public off(event: string) {
    if (typeof this._client !== "undefined") {
      this._client.off(event);
    }
  }

  get client(): SocketIOClient.Socket {
    return this._client;
  }
}

export default SocketProvider.getInstance();

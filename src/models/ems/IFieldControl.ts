export type HubFunctions = "motor" | "servo";

export interface IHubParameters {
  port: number;
  setpoint?: number;
  pulsewidth?: number;
}

export interface IHubMessage {
  hub: number;
  function: HubFunctions;
  parameters: IHubParameters;
}

export interface IFieldControlPacket {
  messages: IHubMessage[];
}
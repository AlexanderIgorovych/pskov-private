export interface BaseAction {
  type: string;
}

export interface ActionWithPayload<PayLoad> {
  type: string;
  payload: PayLoad;
}

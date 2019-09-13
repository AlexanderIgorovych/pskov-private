export interface IAddPartnerState {
  partnerType: number;
  partner: {
    name: string;
    passOrInn: string;
    phone: string;
  };
}

export const INITIAL_ADD_PARTNER_STATE: IAddPartnerState = {
  partnerType: undefined,
  partner: undefined
};

export function addPartnerReducer(
  state: IAddPartnerState = INITIAL_ADD_PARTNER_STATE,
  action: any
): IAddPartnerState {
  switch (action.type) {
  }
  return state;
}

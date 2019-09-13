import { AffiliateEntity } from '../../../shared/entitys/affiliate.entity';
import { GET_AFFILIATES } from '../main.actions';

export interface IPropertyState {
  affiliates: AffiliateEntity[];
}

export const PROPERTY_INITIAL_STATE: IPropertyState = {
  affiliates: []
};

export function propertyReducer(
  state: IPropertyState = PROPERTY_INITIAL_STATE,
  action
): IPropertyState {
  switch (action.type) {
    case GET_AFFILIATES:
      return updateAffiliates(state, action);
  }
  return state;
}

function updateAffiliates(state, action) {
  return { ...action.data };
}

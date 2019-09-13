import * as actions from './responsible-save.actions';


export interface IResponsibleStore {
  types : any[]
}

export const INITIAL_RESPONSE_SAVE_STATE = {
  types : undefined
}

export const responseSaveReducer = (state : IResponsibleStore = INITIAL_RESPONSE_SAVE_STATE, action) : IResponsibleStore => {

  switch (action.type) {

    case actions.ON_SAVE_REASONS_TYPE:
      return {
        ...state,
        types : action.payload
      }

    default:
      return state;
  }
}

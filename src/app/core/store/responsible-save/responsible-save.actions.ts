import { ActionCreator } from "../action.creator";

const actionFabric = (instanceName, actionType) => {
  const NameClass = instanceName;

  return class NameClass extends ActionCreator {
    payload : any;

    constructor(payload : any){
      super(actionType);
      this.payload = payload;
    }
  }
};

// Save reasons  

export const ON_SAVE_REASONS_TYPE = 'ON_SAVE_REASONS_TYPE';
export const SaveReasonsType = actionFabric('SaveReasonsType', ON_SAVE_REASONS_TYPE);

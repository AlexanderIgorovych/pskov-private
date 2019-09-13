import { ActionCreator } from '../action.creator';



export const ON_UPDATE_TABLE_LIST    = 'ON_UPDATE_TABLE_LIST';

/*
  This simple function just a constructor for initialize new action
*/

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

export const ON_CONTAINER_CREATE = 'ON_CONTAINER_CREATE';
export const OnCreateContainer =  actionFabric('OnCreateContainer', ON_CONTAINER_CREATE);

// Update Table First Time

export const ON_UPDATE_CURRENT_TABLE_INITIAL = 'ON_UPDATE_CURRENT_TABLE_INITIAL';
export const UpdateCurrentTable = actionFabric('UpdateCurrentTable', ON_UPDATE_CURRENT_TABLE_INITIAL);

// Load Table When Component was Mounted

export const LOAD_TABLE_ON_MOUNT = 'LOAD_TABLE_ON_MOUNT';
export const LoadTableOnMount =  actionFabric('LoadTableOnMount', LOAD_TABLE_ON_MOUNT)

// Update Table in Edit Mode

export const EDIT_CURRENT_TABLE_ON_EDIT = 'EDIT_CURRENT_TABLE_ON_EDIT';
export const EditCurrentTableEdit = actionFabric('EditCurrentTableEdit', EDIT_CURRENT_TABLE_ON_EDIT);

// Update Table With Selected Elements

export const ON_UPDATE_TABLE_SELECTED_ELEMENTS = 'ON_UPDATE_TABLE_SELECTED_ELEMENTS';
export const UpdateCurrentTableSelected = actionFabric('UpdateCurrentTableSelected', ON_UPDATE_TABLE_SELECTED_ELEMENTS);

export const ON_NEW_ROW_TABLE_CREATE = 'ON_NEW_ROW_TABLE_CREATE';
export const CreateNewTableRow = actionFabric('CreateNewTableRow', ON_NEW_ROW_TABLE_CREATE);

// Finally table Colors load

export const ON_LOAD_FINALLY_TABLE_COLOR = 'ON_LOAD_FINALLY_TABLE_COLOR';
export const OnLoadFinallyTableColor = actionFabric('OnLoadFinallyTableColor', ON_LOAD_FINALLY_TABLE_COLOR);

// Finally table black load

export const ON_LOAD_FINALLY_TABLE_BLACK = 'ON_LOAD_FINALLY_TABLE_BLACK';
export const OnLoadFinallyTableBlack = actionFabric('OnLoadFinallyTableBlack', ON_LOAD_FINALLY_TABLE_BLACK);

// Update Finally Table

export const ON_UPDATE_CURRENT_FINALLY_TABLE_COLOR = 'ON_UPDATE_CURRENT_FINALLY_TABLE_COLOR';
export const UpdateFinallyTableColor = actionFabric('UpdateFinallyTableColor', ON_UPDATE_CURRENT_FINALLY_TABLE_COLOR);


// Update Finally Table Black

export const ON_UPDATE_CURRENT_FINALLY_TABLE_BLACK = 'ON_UPDATE_CURRENT_FINALLY_TABLE_BLACK';
export const UpdateFinallyTableBlack = actionFabric('UpdateFinallyTableBlack', ON_UPDATE_CURRENT_FINALLY_TABLE_BLACK);

export const ON_UPDATE_GARBAGE_DATA = 'ON_UPDATE_GARBAGE_DATA';
export const UpdateGarbageData = actionFabric('UpdateGarbageData', ON_UPDATE_GARBAGE_DATA);

// Save order after post/orders

export const SAVE_ORDER_ID = 'SAVE_ORDER_ID';
export const SaveOrderId = actionFabric('SaveOrderId', SAVE_ORDER_ID);

// Save weigh id after post/weighnings

export const SAVE_WEIGH_ID = 'SAVE_WEIGH_ID';
export const SaveWeighId = actionFabric('SaveWeighId', SAVE_WEIGH_ID);

export const ON_MARK_ISSUE = 'ON_MARK_ISSUE';
export const MarkIssue = actionFabric('MarkIssue', ON_MARK_ISSUE);

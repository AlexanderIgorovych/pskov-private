import { TableData, FinallyTableData, GarbageData } from "../../../pages/system/shared/services/weighing/weighing.service";
import * as weighActions from './weigh.action';
import { updateStoreByCondition, updateWeighByCondition } from "../../untils";

export interface IWeighState {
  tableData : TableData[];
  container : TableData[];
  colorMetTable : any[],
  blackMetTable : FinallyTableData[];
  garbageValue  : GarbageData;
  order_id : number;
  weigh_id : number;
}

export const INITIAL_WEIGHT_STATE = {
  tableData : undefined,
  colorMetTable : undefined,
  blackMetTable : undefined,
  garbageValue : undefined,
  order_id : undefined,
  weigh_id : undefined,
  container : undefined
}

export function weighReducer(state : IWeighState = INITIAL_WEIGHT_STATE, action) : IWeighState {

  switch (action.type){

    case weighActions.ON_UPDATE_GARBAGE_DATA:
      return {
        ...state,
        garbageValue : {
          ...state.garbageValue,
          ...action.payload
        }
      }

    case weighActions.ON_UPDATE_CURRENT_FINALLY_TABLE_COLOR:
      return updateWeighByCondition(state, 'colorMetTable', action);

    case weighActions.ON_UPDATE_CURRENT_FINALLY_TABLE_BLACK:
      return updateWeighByCondition(state, 'blackMetTable', action);

    case weighActions.ON_LOAD_FINALLY_TABLE_COLOR:
      return {
        ...state,
        colorMetTable : action.payload
      }

    case weighActions.ON_LOAD_FINALLY_TABLE_BLACK:
      return {
        ...state,
        blackMetTable : action.payload
      }

    case weighActions.LOAD_TABLE_ON_MOUNT:
      return {
        ...state,
        tableData : [action.payload]
      }

    case weighActions.ON_CONTAINER_CREATE:
      return {
        ...state,
        container : [action.payload]
      }

    case weighActions.ON_UPDATE_TABLE_LIST:
      return {
        ...state,
        tableData : [...state.tableData, action.payload]
      }

    case weighActions.SAVE_ORDER_ID:
      return {
        ...state,
        order_id : action.payload
      }

    case weighActions.SAVE_WEIGH_ID:
      return {
        ...state,
        weigh_id : action.payload
      }

    case weighActions.ON_MARK_ISSUE:
      console.log(action.payload)
      return updateStoreByCondition(state, [action.payload.tableName], 'idTable', action);

    case weighActions.ON_UPDATE_CURRENT_TABLE_INITIAL:
      // This loop find a certain table. And return it with new value
      const oldArr = [ ...state[action.payload.tableName] ];
      const newArr = [];

      for (let element in state[action.payload.tableName]){
        // When new table created - it created with property with name 'newest' which equals false by default
        // When we update table - we changed this propos to true.
        if (action.payload.data.newest === true){
          // We return elements which weigh not equals null
          const valArr = oldArr.filter(element => element.weigh !== null)
          // And push updated data to new array
          newArr.push(action.payload.data, ...valArr);

        }

        return {
          ...state,
          [action.payload.tableName]: newArr
        }
      }

    case weighActions.EDIT_CURRENT_TABLE_ON_EDIT:
      // Notation for this function you can find in untils.ts file
      return updateStoreByCondition(state, [action.payload.tableName], 'idTable', action);

    case weighActions.ON_UPDATE_TABLE_SELECTED_ELEMENTS:
      return updateStoreByCondition(state, [action.payload.tableName], 'idTable', action);

    case weighActions.ON_NEW_ROW_TABLE_CREATE:


      if (!action.payload.isContainer) {
        return {
          ...state,
          tableData : [
            action.payload.table,
            ...state.tableData,
          ]
        }
      }

      if (action.payload.isContainer) {
        return {
          ...state,
          container : [
            action.payload.table,
            ...state.container,
          ]
        }
      }




    default:
      return state;
  }
}

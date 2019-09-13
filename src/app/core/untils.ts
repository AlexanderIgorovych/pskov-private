import { Subscription } from 'rxjs';

export const unsubscribeAll = (subscriptions: Subscription[]) => {
  subscriptions.forEach(sub => {
    if (sub.unsubscribe) {
      sub.unsubscribe();
    }
  });
};

export const isOnline = () => navigator.onLine;

/*
  This function returns updated state depends on id of list. It can be useful if
  you need to update some element, but you don't need to update all elements in store,
  and you don't need update all props of elements. This function compare element which
  you pass with element which already exist in store. If it don't find matches - it returns
  the array with the same elements, if matched was found - it returns with the same elements
  and new updated element
*/

export const updateDocsStore = (state, payload) => {

  const initalObject = {
    requisites : [],
    international : [],
    passport : [],
    ttn : [],
    statement : [],
    psa : [],
    inn : [],
    photo : [],
    cover : [],
    certificate : []
  };

  payload.map(element => initalObject[element.type] = [...initalObject[element.type], element])
  return { ...initalObject }
}

export const updateStoreByCondition = (state, updatedProps, props, action) => {

    const nonUpdatedList = [...state[updatedProps]];
    const updatedList    = [];

    for (let element in state[updatedProps]){

      if (nonUpdatedList[element].id !== action.payload.data[props]) {
        nonUpdatedList.filter(tb => tb.id == action.payload.data.idTable
          ? updatedList.push({ ...tb, ...action.payload.data })
          : updatedList.push({ ...tb }))
      }

      if (state[updatedProps][element].id === action.payload.data[props]) {
        console.log('log')
        if (state[updatedProps][element].cutter !== action.payload.data.cutter
          || state[updatedProps][element].car !== action.payload.data.car
          || state[updatedProps][element].isIssue !== action.payload.data.isIssue
          || state[updatedProps][element].typeScrap !== action.payload.data.typeScrap
          || state[updatedProps][element].actType !== action.payload.data.actType) {

          nonUpdatedList.filter(tb => tb.id == action.payload.data[props]
            ? updatedList.push({ ...tb, ...action.payload.data })
            : updatedList.push({ ...tb }));
      } else {

        return {
          ...state
        }
      }
    }

    return {
      ...state,
      [updatedProps] : updatedList
    };
  }
}


export const updateWeighByCondition = (state, updatedProps, action) => {

  const nonUpdatedList = [...state[updatedProps]];
  const updatedList    = [];

  for (let element in state[updatedProps]){

    if (nonUpdatedList[element].id !== action.payload.id){

      nonUpdatedList.filter(element => element.id == action.payload.id
        ? updatedList.push({ ...element, ...action.payload, weighNet : ((element.weigh / 100 ) * action.payload.waste + element.weigh).toFixed(2) })
        : updatedList.push({ ...element }))

    }

    if (nonUpdatedList[element].id === action.payload.id){

      if (nonUpdatedList[element].waste !== action.payload.waste){

        nonUpdatedList.filter(tb => tb.id == action.payload.id
          ? updatedList.push({ ...tb, ...action.payload, weighNet : ((tb.weigh / 100 ) * action.payload.waste + tb.weigh).toFixed(2) })
          : updatedList.push({ ...tb }));

      } else return { ...state }

    }

    return {
      ...state,
      [updatedProps] : updatedList
    };
  }
}

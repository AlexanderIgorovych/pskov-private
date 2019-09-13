import * as docsAction from "./add-documents.actions";
import { updateDocsStore } from "../../untils";

// import * as

export interface IAddDocumentsState {
  partnerType: number;
  partner: {
    name: string;
    passOrInn: string;
    phone: string;
  };
  partnerDocs : any;
  international : any[];
  passport : any[];
  inn : any[];
  psa : any[];
  statement : any[];
  ttn : any[];
  requisites : any[];
  photo : any[];
  cover : any[];
  certificate : any[];
}

export const INITIAL_ADD_DOCUMENTS_STATE: IAddDocumentsState = {
  partnerType : undefined,
  partner     : undefined,
  partnerDocs : undefined,
  international : undefined,
  ttn : undefined,
  statement : undefined,
  psa : undefined,
  passport : undefined,
  requisites : undefined,
  inn   : undefined,
  photo : undefined,
  cover : undefined,
  certificate : undefined
};

export function addDocumentsReducer(
  state: IAddDocumentsState = INITIAL_ADD_DOCUMENTS_STATE,
  action: any
): any {
  switch (action.type) {

    case docsAction.SAVE_DOCUMENTS_SUCCESS:
      return updateDocsStore(state, action.payload)

    case docsAction.SAVE_DOCS_STORE:
      return {
        ...state,
        partnerDocs : action.payload
      }
  }

  return state;
}

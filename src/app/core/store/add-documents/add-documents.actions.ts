import { ActionCreator } from '../action.creator';

export const SAVE_DOCUMENTS = 'SAVE_DOCUMENTS';

export class SaveDocuments extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(SAVE_DOCUMENTS);
    this.payload = payload;
  }
}
export const SAVE_DOCUMENTS_SUCCESS = 'SAVE_DOCUMENTS_SUCCESS';

export class SaveDocumentsSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(SAVE_DOCUMENTS_SUCCESS);
    this.payload = payload;
  }
}
export const SAVE_DOCUMENTS_ERROR = 'SAVE_DOCUMENTS_ERROR';

export class SaveDocumentsError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(SAVE_DOCUMENTS_ERROR);
    this.payload = payload;
  }
};

export const SAVE_DOCS_STORE = 'SAVE_DOCS_STORE';

export class SaveDocumentsStore extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(SAVE_DOCS_STORE);
    this.payload = payload;
  }
};

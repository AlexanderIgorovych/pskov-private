import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AxiosError } from '../../../node_modules/axios';
export interface ActionError {
  type: string;
  error: string | Error;
}

export interface Error {
  data: string;
  status: number;
  headers: { [key: string]: string };
}

@Injectable()
export class ErrorHandlerService {
  constructor() {}

  possibleResponseErrors(error: AxiosError): ActionError {
    const err: Error = {
      data: error.response.data.error,
      status: error.response.status,
      headers: error.response.headers
    };

    let accessKey = error.response.status.toString();

    let defaultServerError = 'INTERNAL_SERVER_ERROR';

    let errors = {
      500: defaultServerError,
      505: 'INTERNAL_SERVER_ERROR'
    };
    let actionError: string = errors[accessKey]
      ? errors[accessKey]
      : defaultServerError;
    return {
      type: actionError,
      error: err
    };
  }

  // Here you can handle different types of errors from server.
  handleResponseError(error: AxiosError): ActionError {
    return this.possibleResponseErrors(error);
  }

  // Here you can handle different types of request errors, f.e. depending on status.
  handleRequestError(error: AxiosError): ActionError {
    return { type: 'REQUEST_ERROR', error: 'Status ' + error.request.status };
  }

  catchUnknownError(error: AxiosError): ActionError {
    return { type: 'UNKNOWN_ERROR', error: error.message };
  }

  handleError(error: AxiosError): ActionError {
    return error.response
      ? this.handleResponseError(error)
      : error.request
      ? this.handleRequestError(error)
      : this.catchUnknownError(error);
  }
}

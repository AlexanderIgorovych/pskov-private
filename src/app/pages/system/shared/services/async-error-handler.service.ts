import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AsyncErrorHandlerService {

  errorHandler(error, code){
    const handlerErr = { ...error };
    return handlerErr.response.data.error.code === code ? true : false
  }

  constructor() { }
}

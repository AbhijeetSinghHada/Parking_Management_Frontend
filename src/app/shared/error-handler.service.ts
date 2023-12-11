import { Injectable } from '@angular/core';
import { AlertService } from './alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseHandlerService {
  constructor() {}

  handleResponse(data) {
    if (data.error) {
      const msgError = data.error;
      const message = msgError.message;
      const type = 'success';
      if (msgError.code === 200) {
        return {
          message: message,
          type: 'success',
          timeout: 3000,
        };
      } else {
        return {
          message: message,
          type: 'error',
          timeout: 3000,
        };
      }
    } else {
      return {
        message: data.message,
        type: 'success',
        timeout: 5000,
      };
    }
  }
}

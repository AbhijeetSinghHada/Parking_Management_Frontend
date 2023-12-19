import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ResponseHandlerService {
  constructor(private messageService: MessageService) {}

  handleError(error) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error.error.message) {
      errorMessage = error.error.error.message;
    }
    this.messageService.add({
      severity: 'error',
      detail: errorMessage,
    });
    return error;
  }
}

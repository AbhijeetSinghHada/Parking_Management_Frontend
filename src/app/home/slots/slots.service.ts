import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ResponseHandlerService } from 'src/app/shared/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  constructor(
    private http: HttpClient,
    private responseHandler: ResponseHandlerService,
    private alertService: AlertService
  ) {}

  getSlotTable(slot_type: string) {
    return this.http
      .get('http://127.0.0.1:8000/slots', {
        params: new HttpParams().append('slot_type', slot_type),
      })
      .pipe(
        catchError((error) => {
          const resolvedError = this.responseHandler.handleResponse(
            error.error
          );
          this.alertService.alertDetails.next(resolvedError);
          return throwError(resolvedError);
        })
      );
  }
}

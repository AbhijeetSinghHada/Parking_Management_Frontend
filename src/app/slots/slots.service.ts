import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { ResponseHandlerService } from 'src/app/shared/error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  constructor(
    private http: HttpClient,
    private responseHandler: ResponseHandlerService
  ) {}

  getSlotTable(slot_type: string) {
    return this.http
      .get('http://127.0.0.1:8000/slots', {
        params: new HttpParams().append('slot_type', slot_type),
      })
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  banSlot(slot_number: string, slot_type: string) {
    return this.http.post('http://127.0.0.1:8000/slots/ban', {
      slot_type: slot_type,
      slot_number: parseInt(slot_number),
    });
  }
  unbanSlot(slot_number: string, slot_type: string) {
    return this.http.post('http://127.0.0.1:8000/slots/unban', {
      slot_type: slot_type,
      slot_number: parseInt(slot_number),
    });
  }
}

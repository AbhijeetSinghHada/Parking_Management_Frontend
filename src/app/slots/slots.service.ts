import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  constructor(private http: HttpClient) {}

  getSlotTable(slot_type: string) {
    return this.http
      .get('http://127.0.0.1:8000/slots', {
        params: new HttpParams().append('slot_type', slot_type),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  updateSlotStatus(slot_number: string, slot_type: string, status: string) {
    return this.http.post(`http://127.0.0.1:8000/slots/${status}`, {
      slot_type: slot_type,
      slot_number: parseInt(slot_number),
    });
  }
}

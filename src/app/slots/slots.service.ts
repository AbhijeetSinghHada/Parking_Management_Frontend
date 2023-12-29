import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import * as config from '../shared/config';
import { Slot } from './slot.model';

export interface SlotUpdate {
  slot_type: string;
  slot_number: number;
}

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  constructor(private http: HttpClient) {}

  getSlotTable(slot_type: string): Observable<Slot[]> {
    return this.http
      .get<Slot[]>(`${config.BaseURL}/slots`, {
        params: new HttpParams().append('slot_type', slot_type),
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
  updateSlotStatus(
    slot_number: number,
    slot_type: string,
    status: string
  ): Observable<SlotUpdate> {
    return this.http.post<SlotUpdate>(`${config.BaseURL}/slots/${status}`, {
      slot_type: slot_type,
      slot_number: slot_number,
    });
  }
}

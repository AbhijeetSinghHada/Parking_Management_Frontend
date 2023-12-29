import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as config from 'src/app/shared/config';
import { Bill } from './bill/bill.interface';
@Injectable({
  providedIn: 'root',
})
export class UnassignSlotService {
  constructor(private http: HttpClient) {}

  unAssignSlot(vehicle_number: string): Observable<Bill> {
    return this.http.delete<Bill>(`${config.BaseURL}/slots/unassign`, {
      params: { vehicle_number: vehicle_number },
    });
  }
}

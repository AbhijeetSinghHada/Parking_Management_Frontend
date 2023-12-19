import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UnassignSlotService {
  constructor(private http: HttpClient) {}

  unAssignSlot(vehicle_number: string) {
    return this.http.delete(`http://localhost:8000/slots/unassign`, {
      params: { vehicle_number: vehicle_number },
    });
  }
}

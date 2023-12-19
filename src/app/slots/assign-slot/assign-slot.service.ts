import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AssignSlotService {
  constructor(private http: HttpClient) {}

  assignSlot(slotId: string, slotType: string, vehicleNumber: string) {
    console.log(slotId, slotType, vehicleNumber);
    return this.http.post('http://localhost:8000/slots/assign', {
      slot_number: parseInt(slotId),
      vehicle_type: slotType,
      vehicle_number: vehicleNumber,
    });
  }
}

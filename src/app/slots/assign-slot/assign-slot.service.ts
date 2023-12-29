import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as config from 'src/app/shared/config';

@Injectable({
  providedIn: 'root',
})
export class AssignSlotService {
  constructor(private http: HttpClient) {}

  assignSlot(slotId: string, slotType: string, vehicleNumber: string) {
    console.log(slotId, slotType, vehicleNumber);
    return this.http.post(`${config.BaseURL}/slots/assign`, {
      slot_number: parseInt(slotId),
      vehicle_type: slotType,
      vehicle_number: vehicleNumber,
    });
  }
}

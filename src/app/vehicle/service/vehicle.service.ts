import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as config from '../../shared/config';

export interface vehicleDetails {
  vehicle_number: string;
  vehicle_type: string;
  customer: {
    name: string;
    email_address: string;
    phone_number: string;
  };
  message: string;
}

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private http: HttpClient) {}
  vehicleOverlayToggle = new Subject<boolean>();

  add_vehicle(vehicle_details): Observable<vehicleDetails> {
    return this.http.post<vehicleDetails>(
      `${config.BaseURL}/vehicle`,
      vehicle_details
    );
  }
}

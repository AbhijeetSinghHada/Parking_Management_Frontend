import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private http: HttpClient) {}
  vehicleOverlayToggle = new Subject<boolean>();

  add_vehicle(vehicle_details) {
    return this.http.post('http://localhost:8000/vehicle', vehicle_details);
  }
}

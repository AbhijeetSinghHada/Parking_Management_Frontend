import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor() {}
  vehicleOverlayToggle = new Subject<boolean>();
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { AlertService } from '../shared/alert/alert.service';
import { ResponseHandlerService } from '../shared/error-handler.service';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(
    private http: HttpClient,
    private responseHandler: ResponseHandlerService,
    private alertService: AlertService
  ) {}
  vehicleOverlayToggle = new Subject<boolean>();

  add_vehicle(vehicle_details) {
    return this.http
      .post('http://localhost:8000/vehicle', vehicle_details)
      .pipe(
        tap((data: any) => {
          const resolvedResponse = this.responseHandler.handleResponse(data);
          this.alertService.alertDetails.next(resolvedResponse);
        })
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ResponseHandlerService } from 'src/app/shared/error-handler.service';

export type parkingSpaceFunctionalDetails = {
  edit: boolean;
  formTitle: string;
  parkingCategory: string;
  totalCapacity: number;
  charges: number;
};

export type parkingSpace = {
  slot_type: string;
  total_capacity: number;
  charge: number;
};
@Injectable({
  providedIn: 'root',
})
export class ParkingSpaceService {
  parkingSpaceDetails: BehaviorSubject<parkingSpaceFunctionalDetails> =
    new BehaviorSubject(null);
  selectedParkingSpace: BehaviorSubject<parkingSpace> = new BehaviorSubject(
    null
  );
  listParkingSpace: any[];
  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private responseHandler: ResponseHandlerService
  ) {}
  getParkingSpace() {
    return this.http.get('http://127.0.0.1:8000/parkingspace').pipe(
      tap((data: any[]) => {
        this.listParkingSpace = data;
      }),
      catchError((error) => {
        const resolvedError = this.responseHandler.handleResponse(error.error);
        this.alertService.alertDetails.next(resolvedError);
        return throwError(resolvedError);
      })
    );
  }
  addParkingSpace(parkingSpace: parkingSpace) {
    return this.http
      .post('http://127.0.0.1:8000/parkingspace/add', parkingSpace)
      .pipe(
        catchError((error) => {
          const resolvedError = this.responseHandler.handleResponse(
            error.error
          );
          this.alertService.alertDetails.next(resolvedError);
          return throwError(resolvedError);
        })
      );
  }

  updateParkingSpace(parkingSpace: parkingSpace) {
    return this.http
      .put('http://127.0.0.1:8000/parkingspace/update', parkingSpace)
      .pipe(
        catchError((error) => {
          const resolvedError = this.responseHandler.handleResponse(
            error.error
          );
          this.alertService.alertDetails.next(resolvedError);
          return throwError(resolvedError);
        })
      );
  }
}

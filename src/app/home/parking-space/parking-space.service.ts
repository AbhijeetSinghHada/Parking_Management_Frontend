import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
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
    private responseHandler: ResponseHandlerService
  ) {}
  getParkingSpace() {
    return this.http.get('http://127.0.0.1:8000/parkingspace').pipe(
      tap((data: any[]) => {
        this.listParkingSpace = data;
      })
    );
  }
  addParkingSpace(parkingSpace: parkingSpace) {
    return this.http.post(
      'http://127.0.0.1:8000/parkingspace/add',
      parkingSpace
    );
  }

  updateParkingSpace(parkingSpace: parkingSpace) {
    return this.http.put(
      'http://127.0.0.1:8000/parkingspace/update',
      parkingSpace
    );
  }
}

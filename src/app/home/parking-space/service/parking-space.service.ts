import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import * as config from 'src/app/shared/config';

export type parkingSpaceFunctionalDetails = {
  edit?: boolean;
  formTitle?: string;
  parkingCategory?: string;
  totalCapacity?: number;
  charges?: number;
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
  constructor(private http: HttpClient) {}
  getParkingSpace() {
    return this.http.get(`${config.BaseURL}/parkingspace`).pipe(
      tap((data: any[]) => {
        this.listParkingSpace = data;
      })
    );
  }
  addParkingSpace(parkingSpace: parkingSpace) {
    return this.http.post(`${config.BaseURL}/parkingspace/add`, parkingSpace);
  }

  updateParkingSpace(parkingSpace: parkingSpace) {
    return this.http.put(`${config.BaseURL}/parkingspace/update`, parkingSpace);
  }
}

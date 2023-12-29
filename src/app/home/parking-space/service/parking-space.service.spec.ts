import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import * as config from '../../../shared/config';
import { ParkingSpaceService } from './parking-space.service';

describe('Vehicle Service', () => {
  let parkingSpaceService: ParkingSpaceService;
  let httpTestingController: HttpTestingController;
  let http: HttpClient;
  const parkingSpace_details = {
    slot_type: 'Test 1',
    total_capacity: 75,
    charge: 1000,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParkingSpaceService, HttpClient],
    });
    parkingSpaceService = TestBed.inject(ParkingSpaceService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  describe('addParkingSpace Function', () => {
    it('should send request correctly', (done: DoneFn) => {
      parkingSpaceService
        .addParkingSpace(parkingSpace_details)
        .subscribe((data) => {
          done();
        });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/parkingspace/add`
      );
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(parkingSpace_details);
      request.flush({});
    });
    it('should return response correctly', (done: DoneFn) => {
      const response = {
        message: 'Parking Space Added Successfully',
        status: 'Success',
      };
      parkingSpaceService
        .addParkingSpace(parkingSpace_details)
        .subscribe((data) => {
          expect(data).toEqual(response);
          done();
        });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/parkingspace/add`
      );
      request.flush(response);
    });
  });
  describe('updateParkingSpace Function', () => {
    it('should send request correctly', (done: DoneFn) => {
      parkingSpaceService
        .updateParkingSpace(parkingSpace_details)
        .subscribe((data) => {
          done();
        });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/parkingspace/update`
      );
      expect(request.request.method).toBe('PUT');
      expect(request.request.body).toEqual(parkingSpace_details);
      request.flush({});
    });
    it('should return response correctly', (done: DoneFn) => {
      const response = {
        message: 'Parking Space Updated Successfully',
        status: 'Success',
      };
      parkingSpaceService
        .updateParkingSpace(parkingSpace_details)
        .subscribe((data) => {
          expect(data).toEqual(response);
          done();
        });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/parkingspace/update`
      );
      request.flush(response);
    });
  });
  describe('getParkingSpace Function', () => {
    it('should send request correctly', (done: DoneFn) => {
      parkingSpaceService.getParkingSpace().subscribe((data) => {
        done();
      });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/parkingspace`
      );
      expect(request.request.method).toBe('GET');
      request.flush({});
    });
    it('should return response correctly', (done: DoneFn) => {
      const response = [
        {
          slot_type: 'Test 1',
          total_capacity: 75,
          charge: 1000,
        },
        {
          slot_type: 'Test 2',
          total_capacity: 50,
          charge: 500,
        },
      ];
      parkingSpaceService.getParkingSpace().subscribe((data) => {
        expect(data).toEqual(response);
        done();
      });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/parkingspace`
      );
      request.flush(response);
    });
  });
});

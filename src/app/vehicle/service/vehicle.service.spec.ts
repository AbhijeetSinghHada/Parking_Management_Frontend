import { TestBed } from '@angular/core/testing';
import { VehicleService } from './vehicle.service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import * as config from '../../shared/config';

describe('Vehicle Service', () => {
  let vehicleService: VehicleService;
  let httpTestingController: HttpTestingController;
  let http: HttpClient;
  const vehicle_details = {
    vehicle_number: 'RJ20CD7259',
    vehicle_type: 'LMV',
    customer: {
      name: 'Test',
      email_address: 'test@gmail.com',
      phone_number: '1234567890',
    },
  };
  const testResponseBody = {
    message: 'Vehicle Added Successfully',
    status: 'Success',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehicleService, HttpClient],
    });
    vehicleService = TestBed.inject(VehicleService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('Add Vehicle', () => {
    it('should send request correctly', (done: DoneFn) => {
      const vehicle_details = {
        vehicle_number: 'RJ20CD7259',
        vehicle_type: 'LMV',
        customer: {
          name: 'Test',
          email_address: 'test@gmail.com',
          phone_number: '1234567890',
        },
      };

      vehicleService.add_vehicle(vehicle_details).subscribe((data) => {
        done();
      });

      const request = httpTestingController.expectOne(
        `${config.BaseURL}/vehicle`
      );
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual(vehicle_details);

      request.flush(vehicle_details);

      httpTestingController.verify();
    });

    it('should get correct response', (done: DoneFn) => {
      vehicleService.add_vehicle(vehicle_details).subscribe((response) => {
        expect(response.message).toEqual(testResponseBody.message);
        done();
      });

      const request = httpTestingController.expectOne(
        `${config.BaseURL}/vehicle`
      );
      request.flush(testResponseBody);
      expect(request.request.method).toBe('POST');

      httpTestingController.verify();
    });
  });
});

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  ParkingSpaceService,
  parkingSpace,
} from '../home/parking-space/service/parking-space.service';
import { VehicleService } from './service/vehicle.service';
import { MessageService } from 'primeng/api';
import * as config from 'src/app/shared/config';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  parkingSpaceList: parkingSpace[];
  config = config;
  constructor(
    private parkingSpaceService: ParkingSpaceService,
    private vehicleService: VehicleService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.parkingSpaceList = this.parkingSpaceService.listParkingSpace;
  }
  closeOverlay(): void {
    this.vehicleService.vehicleOverlayToggle.next(false);
  }
  onSubmit(form: NgForm) {
    this.vehicleService.add_vehicle(form.value).subscribe((result) => {
      this.messageService.add({
        severity: 'success',
        detail: result.message,
      });
      this.closeOverlay();
    });
  }
}

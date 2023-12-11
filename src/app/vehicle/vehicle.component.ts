import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParkingSpaceService } from '../home/parking-space/parking-space.service';
import { VehicleService } from './vehicle.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent implements OnInit {
  parkingSpaceList;
  constructor(
    private parkingSpaceService: ParkingSpaceService,
    private vehicleService: VehicleService
  ) {}
  ngOnInit(): void {
    this.parkingSpaceList = this.parkingSpaceService.listParkingSpace;
    console.log(this.parkingSpaceList);
  }
  closeOverlay() {
    this.vehicleService.vehicleOverlayToggle.next(false);
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.vehicleService.add_vehicle(form.value).subscribe(
      (result) => {
        setTimeout(() => {
          this.closeOverlay();
        }, 2000);
      },
      (error) => {
        setTimeout(() => {
          this.closeOverlay();
        }, error.timeout);
      }
    );
  }
}

import { Component } from '@angular/core';
import { VehicleService } from '../vehicle/vehicle.service';
import { AlertService } from '../shared/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private alertService: AlertService,
    private vehicleService: VehicleService
  ) {}
  toggleVehicleOverlay = false;
  toggleAlert = false;
  alertTimeout;
  alertDetails: {
    message: string;
    type: string;
    timeout: number;
  } = {
    message: 'This is a default message',
    type: 'success',
    timeout: 0,
  };

  ngOnInit(): void {
    this.vehicleService.vehicleOverlayToggle.subscribe((data) => {
      this.toggleVehicleOverlay = !this.toggleVehicleOverlay;
    });
    this.alertService.alertDetails.subscribe((data) => {
      this.toggleAlert = true;
      this.alertDetails = data;
      console.log(data);
      this.alertTimeout = setTimeout(() => {
        this.toggleAlert = false;
      }, data.timeout);
    });
  }
  toggleAlertComponent() {
    clearTimeout(this.alertTimeout);
    this.toggleAlert = !this.toggleAlert;
  }
}

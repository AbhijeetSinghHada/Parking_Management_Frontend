import { Component } from '@angular/core';
import { VehicleService } from '../vehicle/service/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private vehicleService: VehicleService) {}
  toggleVehicleOverlay = false;

  ngOnInit(): void {
    this.vehicleService.vehicleOverlayToggle.subscribe((data) => {
      this.toggleVehicleOverlay = !this.toggleVehicleOverlay;
    });
  }
}

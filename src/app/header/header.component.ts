import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { VehicleService } from '../vehicle/service/vehicle.service';
import { constants } from '../shared/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constants: { [key: string]: string } = constants;
  toggleMenuSideButton = false;
  private userSub: Subscription;
  isAuthenticated = false;
  constructor(
    private authService: AuthService,
    private vehicleService: VehicleService
  ) {}
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }
  onVehicle() {
    this.vehicleService.vehicleOverlayToggle.next(true);
  }
  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}

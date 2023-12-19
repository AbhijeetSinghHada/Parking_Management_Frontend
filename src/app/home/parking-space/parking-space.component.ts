import { Component } from '@angular/core';
import { ParkingSpaceService } from './parking-space.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css'],
})
export class ParkingSpaceComponent {
  parkingSpaceList = [];
  selectedCategory: string;
  isOverlayOpen: boolean = false;
  accessorUserRole: string[];
  constructor(
    private parkingSpaceService: ParkingSpaceService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.accessorUserRole = user.roles;
    });
    this.updateParkingSpace();
  }
  toggleOverlay() {
    this.isOverlayOpen = !this.isOverlayOpen;
  }
  onAddParkingSpace() {
    this.parkingSpaceService.parkingSpaceDetails.next({
      edit: false,
      formTitle: 'Add Parking Space',
      parkingCategory: '',
      totalCapacity: null,
      charges: null,
    });
    this.updateParkingSpace();
    this.toggleOverlay();
  }
  getColor(index: number) {
    let colorList = [
      '--accent-color: #23a6d5',
      '--accent-color: #ffc107',
      '--accent-color: #fd7e14',
      '--accent-color: #6610f2',
      '--accent-color: #6f42c1',
      '--accent-color: #d63384',
      '--accent-color: #dc3545',
      '--accent-color: #20c997',
      '--accent-color: #198754',
    ];

    return colorList[index % colorList.length];
  }

  updateParkingSpace() {
    this.parkingSpaceService.getParkingSpace().subscribe((data: Object[]) => {
      this.parkingSpaceList = data;
      this.SelectedCategory(this.parkingSpaceList[0].slot_type);
    });
  }

  SelectedCategory(parkingCategory: string) {
    this.router.navigate(['parkingspace', parkingCategory, 'slots'], {
      relativeTo: this.route,
    });
    this.selectedCategory = parkingCategory;
    this.parkingSpaceService.selectedParkingSpace.next(
      this.parkingSpaceList.find((parkingSpace) => {
        return parkingSpace.slot_type === parkingCategory;
      })
    );
  }
}

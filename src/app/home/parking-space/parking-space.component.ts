import { Component } from '@angular/core';
import { ParkingSpaceService } from './parking-space.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parking-space',
  templateUrl: './parking-space.component.html',
  styleUrls: ['./parking-space.component.css'],
})
export class ParkingSpaceComponent {
  parkingSpaceList = [];
  openAccordionIndex: string | null = null;
  constructor(
    private parkingSpace: ParkingSpaceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.updateParkingSpace();
  }

  updateParkingSpace() {
    this.parkingSpace.getParkingSpace().subscribe((data: Object[]) => {
      this.parkingSpaceList = data;
      console.log(this.parkingSpaceList);
    });
  }

  SelectedCategory(parkingCategory: string) {
    if (this.openAccordionIndex === parkingCategory) {
      this.openAccordionIndex = null;
    } else {
      this.openAccordionIndex = parkingCategory;
    }
    this.router.navigate(['parkingspace', parkingCategory, 'slots'], {
      relativeTo: this.route,
    });
  }
}

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
  getColor(index: number) {
    let colorList = [
      '--accent-color: #0d6efd',
      '--accent-color: #6610f2',
      '--accent-color: #6f42c1',
      '--accent-color: #d63384',
      '--accent-color: #dc3545',
      '--accent-color: #fd7e14',
      '--accent-color: #ffc107',
      '--accent-color: #198754',
      '--accent-color: #20c997',
    ];

    return colorList[index % colorList.length];
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

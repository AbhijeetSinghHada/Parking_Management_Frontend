import { Component } from '@angular/core';
import { SlotsService } from './slots.service';
import { Slot } from './slot.model';
import { ActivatedRoute, Params } from '@angular/router';
import { ParkingSpaceService } from '../home/parking-space/parking-space.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
})
export class SlotsComponent {
  slots: Slot[] = null;
  parkingCategory: string;
  isOverlayOpen: boolean = false;
  selectedCategoryDetails: any = null;
  constructor(
    private slotsService: SlotsService,
    private route: ActivatedRoute,
    private parkingSpaceService: ParkingSpaceService
  ) {}
  ngOnInit() {
    this.parkingCategory = this.route.snapshot.params['category'];
    this.route.params.subscribe((params: Params) => {
      this.parkingCategory = params['category'];
      this.getSlots(this.parkingCategory);
    });
    this.parkingSpaceService.selectedParkingSpace.subscribe((data) => {
      this.selectedCategoryDetails = data;
    });
  }

  getSlots(category: string) {
    this.slotsService.getSlotTable(category).subscribe((data: Slot[]) => {
      this.slots = [...data];
    });
  }
  toggleOverlay() {
    this.isOverlayOpen = !this.isOverlayOpen;
  }
  onEditParkingSpace() {
    this.parkingSpaceService.parkingSpaceDetails.next({
      edit: true,
      formTitle: 'Edit Parking Space',
      parkingCategory: this.parkingCategory,
      totalCapacity: null,
      charges: null,
    });
    this.toggleOverlay();
  }
}
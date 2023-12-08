import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ParkingSpaceService,
  parkingSpaceFunctionalDetails,
} from '../parking-space.service';
import { Subscription, map, take, tap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-add-space',
  templateUrl: './add-update-space.component.html',
  styleUrls: ['add-update-space.component.css'],
})
export class AddUpdateSpaceComponent implements OnInit {
  @Output() closeOverlayEvent = new EventEmitter<void>();
  functionalParkingDetails: parkingSpaceFunctionalDetails;
  constructor(
    private parkingSpaceService: ParkingSpaceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.parkingSpaceService.parkingSpaceDetails
      .pipe(
        take(1),
        tap((parkingSpaceDetails) => {
          this.functionalParkingDetails = parkingSpaceDetails;
        })
      )
      .subscribe();
    if (this.functionalParkingDetails.edit) {
      this.parkingSpaceService.selectedParkingSpace
        .pipe(
          take(1),
          map((parkingSpace) => {
            this.functionalParkingDetails.parkingCategory =
              parkingSpace.slot_type;
            this.functionalParkingDetails.totalCapacity =
              parkingSpace.total_capacity;
            this.functionalParkingDetails.charges = parkingSpace.charge;
          })
        )
        .subscribe();
    }
  }
  onSubmit(form: NgForm) {
    if (this.functionalParkingDetails.edit) {
      console.log(form.value);
      this.parkingSpaceService
        .updateParkingSpace({
          slot_type: form.value.parkingCategory,
          total_capacity: form.value.totalCapacity,
          charge: form.value.charges,
        })
        .subscribe((data) => {
          this.closeOverlayEvent.emit();
        });
    } else {
      this.parkingSpaceService
        .addParkingSpace({
          slot_type: form.value.parkingCategory,
          total_capacity: form.value.totalCapacity,
          charge: form.value.charges,
        })
        .subscribe((data) => {
          this.closeOverlayEvent.emit();
        });
    }
    console.log(this.route.snapshot.url);
  }

  closeOverlay(event) {
    event.preventDefault();
    this.closeOverlayEvent.emit();
  }
}

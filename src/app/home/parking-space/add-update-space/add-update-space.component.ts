import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  ParkingSpaceService,
  parkingSpaceFunctionalDetails,
} from '../service/parking-space.service';
import { Subscription, map, take, tap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { constants } from 'src/app/shared/config';

@Component({
  selector: 'app-update-add-space',
  templateUrl: './add-update-space.component.html',
  styleUrls: ['add-update-space.component.css'],
})
export class AddUpdateSpaceComponent implements OnInit, OnDestroy {
  constants: { [key: string]: string } = constants;
  @Output() closeOverlayEvent = new EventEmitter<void>();
  functionalParkingDetails: parkingSpaceFunctionalDetails;
  parkingServiceSubscription: Subscription;
  selectedParkingSubscription: Subscription;
  constructor(
    private parkingSpaceService: ParkingSpaceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.parkingServiceSubscription =
      this.parkingSpaceService.parkingSpaceDetails
        .pipe(
          take(1),
          tap((parkingSpaceDetails) => {
            this.functionalParkingDetails = parkingSpaceDetails;
          })
        )
        .subscribe();
    if (this.functionalParkingDetails.edit) {
      this.selectedParkingSubscription =
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
      this.parkingSpaceService
        .updateParkingSpace({
          slot_type: form.value.parkingCategory,
          total_capacity: form.value.totalCapacity,
          charge: form.value.charges,
        })
        .subscribe((data) => {
          this.closeOverlayEvent.emit();
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([decodeURI(this.router.url)]);
            });
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
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([decodeURI(this.router.url)]);
            });
        });
    }
  }

  closeOverlay(event) {
    event.preventDefault();
    this.closeOverlayEvent.emit();
  }
  ngOnDestroy(): void {
    this.parkingServiceSubscription.unsubscribe();
    this.selectedParkingSubscription.unsubscribe();
  }
}

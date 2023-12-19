import { Component } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';

import { SlotsService } from './slots.service';
import { Slot } from './slot.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParkingSpaceService } from '../home/parking-space/parking-space.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
  providers: [ConfirmationService],
})
export class SlotsComponent {
  slots: Slot[] = null;
  accessorUserRole: string[];
  parkingCategory: string;
  isAddUpdateOverlayOpen: boolean = false;
  selectedCategoryDetails: any = null;
  constructor(
    private slotsService: SlotsService,
    private route: ActivatedRoute,
    private router: Router,
    private parkingSpaceService: ParkingSpaceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.accessorUserRole = user.roles;
    });
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
  onEditParkingSpace() {
    this.parkingSpaceService.parkingSpaceDetails.next({
      edit: true,
      formTitle: 'Edit Parking Space',
      parkingCategory: this.parkingCategory,
      totalCapacity: null,
      charges: null,
    });
    this.toggleAddUpdateOverlay();
  }
  onParkVehicle(slot) {
    this.router.navigate([slot.slot_id, 'assign'], { relativeTo: this.route });
  }

  toggleAddUpdateOverlay() {
    this.isAddUpdateOverlayOpen = !this.isAddUpdateOverlayOpen;
  }
  onCheckoutVehicle() {
    this.router.navigate(['unassign'], {
      relativeTo: this.route,
      skipLocationChange: true,
      onSameUrlNavigation: 'reload',
    });
  }
  onBanSlot(event, slot) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure that you want to Ban Slot Number: ${slot.slot_id}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      acceptLabel: 'Okay',
      acceptButtonStyleClass: 'p-button-danger',
      rejectLabel: 'Cancel',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.slotsService
          .banSlot(slot.slot_id, this.selectedCategoryDetails.slot_type)
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Slot has been banned successfully',
              });
            },
            (error) => {
              const errorDetails = error.error.error;
              const message = errorDetails.message;
              this.messageService.add({
                severity: 'error',
                summary: errorDetails,
                detail: message,
              });
            }
          );
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([decodeURI(this.router.url)]);
          });
      },
      reject: this.reject.bind(this),
    });
  }
  onUnBanSlot(event, slot) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure that you want to Un-Ban Slot Number: ${slot.slot_id}?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      acceptLabel: 'Okay',
      acceptButtonStyleClass: 'p-button-success',
      rejectLabel: 'Cancel',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.slotsService
          .unbanSlot(slot.slot_id, this.selectedCategoryDetails.slot_type)
          .subscribe(
            (data) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Slot has been Un-Banned successfully',
              });
            },
            (error) => {
              this.errorHandler(error);
            }
          );
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate([decodeURI(this.router.url)]);
          });
      },
      reject: this.reject.bind(this),
    });
  }

  errorHandler(error) {
    const errorDetails = error.error.error;
    const message = errorDetails.message;
    this.messageService.add({
      severity: 'error',
      summary: errorDetails,
      detail: message,
    });
  }
  reject() {}
}

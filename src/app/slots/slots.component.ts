import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

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
export class SlotsComponent implements OnInit {
  slots: Slot[] = null;
  accessorUserRole: string[];
  parkingCategory: string;
  isAddUpdateOverlayOpen = false;
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
        this.updateSlotStatus(slot.slot_id, 'ban');
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
        this.updateSlotStatus(slot.slot_id, 'unban');
      },
      reject: this.reject.bind(this),
    });
  }

  updateSlotStatus(slotId: string, status: string) {
    const slotType = this.selectedCategoryDetails.slot_type;
    const action = status === 'ban' ? 'banned' : 'Un-Banned';
    const successMessage = `Slot has been ${action} successfully`;

    this.slotsService.updateSlotStatus(slotId, slotType, status).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: successMessage,
        });
        this.refreshPage();
      },
      (error) => {
        this.errorHandler(error);
      }
    );
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

  private refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.router.url)]);
    });
  }
}

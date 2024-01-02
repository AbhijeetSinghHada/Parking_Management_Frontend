import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { SlotsService } from './slots.service';
import { Slot } from './slot.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ParkingSpaceService,
  parkingSpace,
} from '../home/parking-space/service/parking-space.service';
import { AuthService } from '../auth/service/auth.service';
import { constants } from '../shared/config';
import { User } from '../shared/user.model';

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
  selectedCategoryDetails: parkingSpace = null;
  constants: { [key: string]: string } = constants;
  constructor(
    private slotsService: SlotsService,
    private route: ActivatedRoute,
    private router: Router,
    private parkingSpaceService: ParkingSpaceService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user: User) => {
      this.accessorUserRole = user.roles;
    });
    this.route.params.subscribe((params: Params) => {
      this.parkingCategory = params['category'];
      this.getSlots(this.parkingCategory);
    });

    this.parkingSpaceService.selectedParkingSpace.subscribe(
      (data: parkingSpace) => {
        this.selectedCategoryDetails = data;
      }
    );
  }

  getSlots(category: string): void {
    this.slotsService.getSlotTable(category).subscribe((data: Slot[]) => {
      this.slots = [...data];
    });
  }

  onEditParkingSpace(): void {
    this.parkingSpaceService.parkingSpaceDetails.next({
      edit: true,
      formTitle: 'Edit Parking Space',
      parkingCategory: this.parkingCategory,
      totalCapacity: null,
      charges: null,
    });
    this.toggleAddUpdateOverlay();
  }

  onParkVehicle(slot: Slot): void {
    this.router.navigate([slot.slot_id, 'assign'], { relativeTo: this.route });
  }

  toggleAddUpdateOverlay(): void {
    this.isAddUpdateOverlayOpen = !this.isAddUpdateOverlayOpen;
  }

  onCheckoutVehicle(): void {
    this.router.navigate(['unassign'], {
      relativeTo: this.route,
      skipLocationChange: true,
      onSameUrlNavigation: 'reload',
    });
  }

  onBanSlot(event, slot: Slot): void {
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
    });
  }

  onUnBanSlot(event, slot: Slot): void {
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
    });
  }

  updateSlotStatus(slotId: number, status: string): void {
    const slotType = this.selectedCategoryDetails.slot_type;
    const action = status === 'ban' ? 'Banned' : 'Un-Banned';
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

  errorHandler(error: any): void {
    const errorDetails = error.error.error;
    const message = errorDetails.message;
    this.messageService.add({
      severity: 'error',
      summary: errorDetails,
      detail: message,
    });
  }

  private refreshPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.router.url)]);
    });
  }
}

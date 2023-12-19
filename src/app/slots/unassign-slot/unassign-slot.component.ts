import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnassignSlotService } from './unassign-slot.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-unassign-slot',
  templateUrl: './unassign-slot.component.html',
  styleUrls: ['./unassign-slot.component.css'],
})
export class UnassignSlotComponent {
  slotId: string = null;
  billDetails: {
    slot: {
      slot_number: number;
      vehicle_number: string;
      vehicle_type: string;
      slot_charges: number;
      bill_id: number;
    };
    bill: {
      customer: {
        cutomer_id: number;
        name: string;
        email_address: string;
        phone_number: string;
      };
      time_in: string;
      time_out: string;
      total_charges: number;
    };
  } = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private unassginSlotService: UnassignSlotService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.slotId = this.route.snapshot.params['slotId'];
  }
  redirectBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  onSubmit(unassignSlotForm) {
    this.unassginSlotService
      .unAssignSlot(unassignSlotForm.value.vehicle_number)
      .subscribe((data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Slot Unassigned successfully. Bill Generated',
        });
        this.billDetails = data;
      });
  }
}

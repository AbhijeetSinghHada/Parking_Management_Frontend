import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnassignSlotService } from './unassign-slot.service';
import { MessageService } from 'primeng/api';
import { constants } from 'src/app/shared/config';
import { Bill } from './bill/bill.interface';

@Component({
  selector: 'app-unassign-slot',
  templateUrl: './unassign-slot.component.html',
  styleUrls: ['./unassign-slot.component.css'],
})
export class UnassignSlotComponent {
  slotId: string = null;
  constants: { [key: string]: string } = constants;
  billDetails: Bill = null;

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
      .subscribe((data: Bill) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Slot Unassigned successfully. Bill Generated',
        });
        this.billDetails = data;
      });
  }
}

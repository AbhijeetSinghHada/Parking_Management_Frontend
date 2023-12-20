import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignSlotService } from './assign-slot.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-assign-slot',
  templateUrl: './assign-slot.component.html',
  styleUrls: ['./assign-slot.component.css'],
})
export class AssignSlotComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private assignSlotService: AssignSlotService,
    private messageService: MessageService
  ) {}
  slotId: string = null;
  slotCategory: string = null;
  ngOnInit() {
    this.slotId = this.route.snapshot.params['slotId'];
    this.slotCategory = this.route.snapshot.pathFromRoot[3].params['category'];
  }
  redirectBack() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.router.url)]);
    });
  }
  onSubmit(form) {
    this.assignSlotService
      .assignSlot(this.slotId, this.slotCategory, form.value.vehicle_number)
      .subscribe((data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Slot assigned successfully',
        });
        this.redirectBack();
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SlotsService } from './slots.service';
import { Slot } from './slot.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.css'],
})
export class SlotsComponent {
  slots: Slot[] = null;
  parkingCategory: string;
  constructor(
    private slotsService: SlotsService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    console.log(this.route.snapshot.params);
    this.parkingCategory = this.route.snapshot.params['category'];
    this.route.params.subscribe((params: Params) => {
      this.parkingCategory = params['category'];
      this.getSlots(this.parkingCategory);
    });
    this.getSlots(this.parkingCategory);
  }

  getSlots(category: string) {
    this.slotsService.getSlotTable(category).subscribe((data: Slot[]) => {
      this.slots = [...data];
    });
  }
}

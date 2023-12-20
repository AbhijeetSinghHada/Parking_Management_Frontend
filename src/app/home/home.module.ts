import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AssignSlotComponent } from '../slots/assign-slot/assign-slot.component';
import { SlotsComponent } from '../slots/slots.component';
import { UnassignSlotComponent } from '../slots/unassign-slot/unassign-slot.component';
import { HomeComponent } from './home.component';
import { AddUpdateSpaceComponent } from './parking-space/add-update-space/add-update-space.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BillComponent } from '../slots/unassign-slot/bill/bill.component';
import { VehicleComponent } from '../vehicle/vehicle.component';
import { ParkingSpaceComponent } from './parking-space/parking-space.component';
import { CommonModule } from '@angular/common';
const routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'parkingspace/:category/slots',
        component: SlotsComponent,
        children: [
          {
            path: ':slotId/assign',
            component: AssignSlotComponent,
          },
          {
            path: 'unassign',
            component: UnassignSlotComponent,
          },
        ],
      },
      {
        path: 'parkingspace/add',
        component: AddUpdateSpaceComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    SlotsComponent,
    AssignSlotComponent,
    UnassignSlotComponent,
    AddUpdateSpaceComponent,
    VehicleComponent,
    BillComponent,
    ParkingSpaceComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CommonModule,
    ToastModule,
    HttpClientModule,
    ConfirmDialogModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class HomeModule {}

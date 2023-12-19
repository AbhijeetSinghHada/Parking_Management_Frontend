import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { SlotsComponent } from './slots/slots.component';
import { AddUpdateSpaceComponent } from './home/parking-space/add-update-space/add-update-space.component';
import { AssignSlotComponent } from './slots/assign-slot/assign-slot.component';
import { UnassignSlotComponent } from './slots/unassign-slot/unassign-slot.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
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
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

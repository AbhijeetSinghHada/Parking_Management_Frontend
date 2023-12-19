import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { ParkingSpaceComponent } from './home/parking-space/parking-space.component';
import { SlotsComponent } from './slots/slots.component';
import { AuthInterceptorService } from './Interceptors/auth-interceptor.service';
import { AddUpdateSpaceComponent } from './home/parking-space/add-update-space/add-update-space.component';
import { FormsModule } from '@angular/forms';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AssignSlotComponent } from './slots/assign-slot/assign-slot.component';
import { UnassignSlotComponent } from './slots/unassign-slot/unassign-slot.component';
import { MessageService } from 'primeng/api';
import { BillComponent } from './slots/unassign-slot/bill/bill.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ParkingSpaceComponent,
    SlotsComponent,
    AddUpdateSpaceComponent,
    VehicleComponent,
    AssignSlotComponent,
    UnassignSlotComponent,
    BillComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    AuthModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    MessageService,
    ToastModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

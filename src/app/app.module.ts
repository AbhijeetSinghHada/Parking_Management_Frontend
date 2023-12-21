import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptorService } from './Interceptors/auth-interceptor.service';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    FormsModule,
    BrowserModule,
    ToastModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ConfirmDialogModule,
    AppRoutingModule,
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

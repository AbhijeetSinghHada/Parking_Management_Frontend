import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Output() closeAlert = new EventEmitter();
  @Input('alertDetails') alertDetails: {
    message: string;
    type: string;
    timeout: number;
  };

  constructor(private alertService: AlertService) {}
  ngOnInit(): void {}
  toggleAlert() {
    this.closeAlert.emit();
  }
}

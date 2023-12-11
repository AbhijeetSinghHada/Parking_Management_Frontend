import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  alertDetails = new Subject<{
    message: string;
    type: string;
    timeout: number;
  }>();
}

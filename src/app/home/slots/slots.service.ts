import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SlotsService {
  constructor(private http: HttpClient) {}

  getSlotTable(slot_type: string) {
    return this.http.get('http://127.0.0.1:8000/slots', {
      params: new HttpParams().append('slot_type', slot_type),
    });
  }
}

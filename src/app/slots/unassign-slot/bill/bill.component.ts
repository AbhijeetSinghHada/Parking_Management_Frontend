import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { constants } from 'src/app/shared/config';
import { Bill } from './bill.interface';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css'],
})
export class BillComponent implements OnInit {
  constants: { [key: string]: string } = constants;
  @Input() billDetails: Bill;
  constructor(private router: Router, private route: ActivatedRoute) {}
  redirectBack() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([decodeURI(this.router.url)]);
    });
  }
  ngOnInit(): void {}
}

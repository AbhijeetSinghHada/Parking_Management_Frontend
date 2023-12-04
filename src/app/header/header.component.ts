import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  constructor() {}
  ngOnInit(): void {}
  onLogout() {}

  ngOnDestroy(): void {}
}

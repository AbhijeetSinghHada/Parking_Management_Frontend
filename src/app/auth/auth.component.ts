import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { constants } from '../shared/config';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constants: { [key: string]: string } = constants;
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.autoLogin();
  }
  onLogin(authForm: NgForm) {
    this.isLoading = true;
    if (!authForm.valid) {
      return;
    }

    const username = authForm.value.username;
    const password = authForm.value.password;
    const rememberMe = authForm.value.rememberMe;
    this.authService.login(username, password, rememberMe).subscribe((data) => {
      this.router.navigate(['/home']);
    });
  }
}

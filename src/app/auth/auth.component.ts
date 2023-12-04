import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.autoLogin();
  }
  onLogin(authFrom: NgForm) {
    if (!authFrom.valid) {
      return;
    }
    const username = authFrom.value.username;
    const password = authFrom.value.password;
    this.authService.login(username, password).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/home']);
    });
  }
}

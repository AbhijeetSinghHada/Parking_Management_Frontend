import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../shared/user.model';
import { HelperService } from '../shared/helper.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private helperService: HelperService,
    private router: Router
  ) {}
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  login(username: string, password: string, rememberMe: boolean) {
    return this.http
      .post('http://127.0.0.1:8000/login', {
        username: username,
        password: password,
      })
      .pipe(
        tap((data: any) => {
          const token = this.helperService.getDecodedAccessToken(
            data['access_token']
          );
          this.handleAuthentication(
            token.name,
            token.role,
            new Date(token.exp * 1000),
            data['access_token'],
            rememberMe
          );
        })
      );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  private handleAuthentication(
    name: string,
    roles: string[],
    expiresIn: Date,
    token: string,
    rememberMe: boolean
  ) {
    const user = new User(name, roles, expiresIn, token);
    this.user.next(user);
    this.autoLogout(expiresIn.getTime() - new Date().getTime());
    if (rememberMe) {
      localStorage.setItem('userData', JSON.stringify(user));
    }
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.name,
      userData.roles,
      new Date(userData._tokenExpirationDate),
      userData._token
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationTime =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.router.navigate(['/home']);
      this.autoLogout(expirationTime);
    }
  }
}

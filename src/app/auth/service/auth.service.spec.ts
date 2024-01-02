import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HelperService } from 'src/app/shared/helper.service';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import * as config from '../../shared/config';
import { Component } from '@angular/core';
import { User } from 'src/app/shared/user.model';

@Component({ template: '' })
class DummyComponent {}

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let helperService: HelperService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path: 'auth',
            component: DummyComponent,
          },
          {
            path: 'home',
            component: DummyComponent,
          },
        ]),
      ],
      providers: [AuthService, HelperService, HttpClient],
    });
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    helperService = TestBed.inject(HelperService);
  });
  describe('Login Function', () => {
    let username: string;
    let password: string;
    let rememberMe: boolean;
    let testResponseBody: { [key: string]: string };
    let decodedAccessToken = {
      name: 'test',
      role: ['admin'],
      exp: 1234567890,
      token: 'token',
    };
    beforeEach(() => {
      const username = 'test';
      const password = 'test@123';
      const rememberMe = false;
      testResponseBody = {
        access_token: 'token',
      };
      spyOn(helperService, 'getDecodedAccessToken').and.returnValue(
        decodedAccessToken
      );
      spyOn<any>(authService, 'handleAuthentication');
    });
    it('should send request correctly', (done: DoneFn) => {
      authService.login(username, password, rememberMe).subscribe((data) => {
        done();
      });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/login`
      );
      request.flush(testResponseBody);
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toEqual({
        username: username,
        password: password,
      });
    });
    it('should call handleAuthentication', (done: DoneFn) => {
      authService.login(username, password, rememberMe).subscribe((data) => {
        done();
      });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/login`
      );
      request.flush(testResponseBody);
      expect(authService['handleAuthentication']).toHaveBeenCalledOnceWith(
        decodedAccessToken.name,
        decodedAccessToken.role,
        new Date(decodedAccessToken.exp * 1000),
        testResponseBody.access_token,
        rememberMe
      );
    });
    it('should call getDecodedAccessToken', (done: DoneFn) => {
      authService.login(username, password, rememberMe).subscribe((data) => {
        done();
      });
      const request = httpTestingController.expectOne(
        `${config.BaseURL}/login`
      );
      request.flush(testResponseBody);
      expect(helperService.getDecodedAccessToken).toHaveBeenCalledWith(
        testResponseBody.access_token
      );
    });
  });
  describe('Logout Function', () => {
    beforeEach(() => {
      spyOn(authService.user, 'next');
    });
    it('should call user.next', () => {
      authService.logout();
      expect(authService.user.next).toHaveBeenCalledWith(null);
    });

    it('should call clearTimeout', () => {
      authService.tokenExpirationTimer = 100000;
      spyOn(window, 'clearTimeout');
      authService.logout();
      expect(window.clearTimeout).toHaveBeenCalledWith(100000);
    });
  });
  describe('autoLogout Function', () => {
    it('should call setTimeout', () => {
      authService.autoLogout(100000);
      expect(authService.tokenExpirationTimer).not.toBeNull();
    });
  });
  describe('handleAuthentication Function', () => {
    let name: string;
    let roles: string[];
    let expiresIn: Date;
    let token: string;
    let rememberMe: boolean;
    beforeEach(() => {
      name = 'test';
      roles = ['admin'];
      expiresIn = new Date();
      token = 'token';
      rememberMe = false;
      spyOn(authService.user, 'next');
      spyOn(authService, 'autoLogout');
      spyOn(window.localStorage, 'setItem').and.callFake(() => {});
    });
    it('should call user.next', () => {
      authService['handleAuthentication'](
        name,
        roles,
        expiresIn,
        token,
        rememberMe
      );
      expect(authService.user.next).toHaveBeenCalledOnceWith(
        new User(name, roles, expiresIn, token)
      );
    });
    it('should call autoLogout', () => {
      authService['handleAuthentication'](
        name,
        roles,
        expiresIn,
        token,
        rememberMe
      );
      expect(authService.autoLogout).toHaveBeenCalledOnceWith(
        expiresIn.getTime() - new Date().getTime()
      );
    });
    it('should call localStorage.setItem', () => {
      const result = authService['handleAuthentication'](
        name,
        roles,
        expiresIn,
        token,
        true
      );
      expect(result).toBeUndefined();
    });
  });
  describe('autoLogin Function', () => {
    let userData: {
      name: string;
      roles: string[];
      _tokenExpirationDate: Date;
      _token: string;
    };
    beforeEach(() => {
      userData = {
        name: 'test',
        roles: ['admin'],
        _tokenExpirationDate: new Date(new Date().getTime() + 100000),
        _token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };
    });
    it('should not do anything if there is no user data in localStorage', () => {
      spyOn(JSON, 'parse').and.returnValue(userData);
      expect(authService.autoLogin()).toBeUndefined();
    });
    it('should call user.next', () => {
      spyOn(JSON, 'parse').and.returnValue(null);

      authService.autoLogin();
    });
  });
});

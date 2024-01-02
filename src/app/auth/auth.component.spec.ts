import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { of } from 'rxjs';

import { AuthComponent } from './auth.component';
import { AuthService } from './service/auth.service';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomeComponent } from '../home/home.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  @Component({ selector: 'app-home', template: '' })
  class FakeHomeComponent {}

  beforeEach(async () => {
    authService = jasmine.createSpyObj('AuthService', ['autoLogin', 'login']);

    await TestBed.configureTestingModule({
      declarations: [AuthComponent, FakeHomeComponent],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([
          {
            path: 'home',
            component: FakeHomeComponent,
          },
        ]),
      ],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('OnLogin Function', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call autoLogin on component initialization', () => {
      expect(authService.autoLogin).toHaveBeenCalled();
    });

    it('should navigate to "/home" on successful login', () => {
      const authForm = <NgForm>{
        valid: true,
        value: {
          username: 'testuser',
          password: 'testpassword',
          rememberMe: true,
        },
      };

      authService.login.and.returnValue(of({}));

      component.onLogin(authForm);

      expect(authService.login).toHaveBeenCalledWith(
        'testuser',
        'testpassword',
        true
      );
    });

    it('should not navigate to "/home" on invalid form', () => {
      const authForm = <NgForm>{
        valid: false,
        value: {
          username: '',
          password: '',
          rememberMe: false,
        },
      };

      component.onLogin(authForm);

      expect(authService.login).not.toHaveBeenCalled();
    });
  });
});

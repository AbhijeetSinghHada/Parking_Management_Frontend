import { TestBed } from '@angular/core/testing';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from '../auth/service/auth.service';
import { ResponseHandlerService } from '../shared/error-handler.service';
import { HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { User } from '../shared/user.model';

describe('AuthInterceptorService', () => {
  let service: AuthInterceptorService;
  let authService: jasmine.SpyObj<AuthService>;
  let responseHandler: jasmine.SpyObj<ResponseHandlerService>;
  let next: jasmine.SpyObj<HttpHandler>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      user: new BehaviorSubject(
        new User(
          'test',
          ['TestRole1', 'TestRole2'],
          new Date(new Date().getTime() + 1000),
          'testToken'
        )
      ),
    });
    const responseHandlerSpy = jasmine.createSpyObj('ResponseHandlerService', [
      'handleError',
    ]);
    const nextSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptorService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ResponseHandlerService, useValue: responseHandlerSpy },
        { provide: HttpHandler, useValue: nextSpy },
      ],
    });

    service = TestBed.inject(AuthInterceptorService);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    responseHandler = TestBed.inject(
      ResponseHandlerService
    ) as jasmine.SpyObj<ResponseHandlerService>;
    next = TestBed.inject(HttpHandler) as jasmine.SpyObj<HttpHandler>;
  });

  it('should not add Authorization header when user is not authenticated', () => {
    const req = new HttpRequest<any>('GET', '/test');

    authService.user.next(null);
    next.handle.and.returnValue(of(null));

    service.intercept(req, next).subscribe();

    expect(next.handle).toHaveBeenCalledWith(req);
  });

  it('should handle errors and propagate them when user authenticated', () => {
    const token = 'testToken';
    const req = new HttpRequest<any>('GET', '/test');
    const error = new Error('Some error');

    next.handle.and.returnValue(throwError(() => error));
    responseHandler.handleError.and.returnValue(throwError(() => error));

    service.intercept(req, next).subscribe({
      next: () => fail('Expected error to be thrown'),
      error: (externalError) => {
        externalError.subscribe({
          error: (internalError) => expect(internalError).toEqual(error),
        });
      },
    });
  });
  it('should handle errors and propagate them when auth request is sent', () => {
    const token = 'testToken';
    let headers = new Headers();
    const req = new HttpRequest<any>('GET', '/test');
    const error = new Error('Some error');
    authService.user.next(null);

    next.handle.and.returnValue(throwError(() => error));
    responseHandler.handleError.and.returnValue(throwError(() => error));

    service.intercept(req, next).subscribe({
      next: () => fail('Expected error to be thrown'),
      error: (externalError) => {
        externalError.subscribe({
          error: (internalError) => expect(internalError).toEqual(error),
        });
      },
    });
  });
});

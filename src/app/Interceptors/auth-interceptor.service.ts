import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, exhaustMap, take, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { AlertService } from '../shared/alert/alert.service';
import { ResponseHandlerService } from '../shared/error-handler.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private responseHandler: ResponseHandlerService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const token = user.token;
        const newReq = req.clone({
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        });
        return next.handle(newReq).pipe(
          catchError((error) => {
            const resolvedError = this.responseHandler.handleResponse(
              error.error
            );
            this.alertService.alertDetails.next(resolvedError);
            return throwError(resolvedError);
          })
        );
      })
    );
  }
}

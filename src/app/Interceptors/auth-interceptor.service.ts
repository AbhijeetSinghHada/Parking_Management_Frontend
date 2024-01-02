import {
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, exhaustMap, take, throwError } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { Injectable } from '@angular/core';
import { ResponseHandlerService } from '../shared/error-handler.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private responseHandler: ResponseHandlerService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req).pipe(
            catchError((error) => {
              return throwError(() => this.responseHandler.handleError(error));
            })
          );
        }
        const token = user.token;
        const newReq = req.clone({
          headers: new HttpHeaders({ Authorization: 'Bearer ' + token }),
        });
        console.log(newReq);
        return next.handle(newReq).pipe(
          catchError((error) => {
            return throwError(() => this.responseHandler.handleError(error));
          })
        );
      })
    );
  }
}

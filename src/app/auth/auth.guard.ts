import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | boolean
  | UrlTree
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree> => {
  const router = inject(Router);
  return inject(AuthService).user.pipe(
    take(1),
    map((user) => {
      const isAllowed: boolean = !!user;
      if (!isAllowed) {
        return router.createUrlTree(['/auth']);
      } else {
        return true;
      }
    })
  );
};

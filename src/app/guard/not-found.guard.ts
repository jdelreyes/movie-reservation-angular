import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../service/local-storage/local-storage.service';

export const notFoundGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const router: Router = inject(Router);

  return localStorageService.hasSession()
    ? true
    : router.navigate(['/not-found']);
};

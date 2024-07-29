import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { LocalStorageService } from '../service/local-storage/local-storage.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const router: Router = inject(Router);

  console.log(route);

  return localStorageService.hasSession()
    ? true
    : router.navigate(['/login'], { queryParams: { redirect: route.url } });
};

import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

export const docResourceResolver: ResolveFn<boolean> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  console.log(route);
  return true;
};

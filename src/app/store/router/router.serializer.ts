import { Params, RouterStateSnapshot, Data } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data?: Data;
  fragment?: string | null;
}

export class RouterSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.<USERNAME>;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      <USERNAME>: { queryParams }
    } = routerState;
    const { fragment, params, data } = route;
    return { url, fragment, params, queryParams, data };
  }
}

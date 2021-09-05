import { Params, RouterStateSnapshot, Data } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  data?: Data;
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
    const { params, data } = route;
    return { url, params, queryParams, data };
  }
}

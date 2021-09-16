import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './store';
import { RouterSerializer } from './store/router/router.serializer';
import { AuthEffects } from './auth/state/auth.effects';
import { CategoryEffects } from './category/state/category.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClintInterceptor } from '@shared/services/http.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthEffects, CategoryEffects]),
    StoreRouterConnectingModule.forRoot({ serializer: RouterSerializer })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpClintInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

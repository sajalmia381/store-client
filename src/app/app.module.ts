import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { environment } from '../environments/environment';
import { appReducer } from './store';
import { RouterSerializer } from './store/router/router.serializer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultLayoutModule } from './default-layout/default-layout.module';
import { MatSnackBarModule as MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import { AuthInterceptor } from '@shared/services/auth.interceptor';
import { ErrorsInterceptor } from '@shared/services/errors.interceptor';
import { AuthEffects } from './v0/auth/state/auth.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({ serializer: RouterSerializer }),
    EffectsModule.forRoot([AuthEffects]),

    NgxGoogleAnalyticsModule.forRoot(environment.GA),
    NgxGoogleAnalyticsRouterModule.forRoot({ exclude: ['/admin/*'] }),
    
    DefaultLayoutModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

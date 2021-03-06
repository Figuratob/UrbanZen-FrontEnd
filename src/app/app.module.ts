import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HeaderModule} from './components/header/header.module';
import {TimetableModule} from './components/timetable/timetable.module';
import {ConfigService} from './services/config.service';
import {BookingsModule} from './general/bookings/bookings.module';
import {ScheduleModule} from './general/schedule/schedule.module';
import {RegisterComponent} from "./general/account/register/register.component";
import {SettingsComponent} from "./general/account/settings/settings.component";
import {LoginComponent} from "./general/account/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from "./components/alert/alert.component";
import {NgxWebstorageModule} from 'ngx-webstorage';
import {PasswordComponent} from "./general/account/password/password.component";
import {JwtInterceptor} from "./components/jwt.interceptor";
import {ErrorInterceptor} from "./components/error.interceptor";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {BrowserModule} from "@angular/platform-browser";
import {PasswordResetInitComponent} from "./general/account/password-reset/init/password-reset-init.component";
import {PasswordResetFinishComponent} from "./general/account/password-reset/finish/password-reset-finish.component";
import {ActivateComponent} from "./general/account/activate/activate.component";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HeaderModule,
    TimetableModule,
    ScheduleModule,
    BookingsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    RegisterComponent,
    SettingsComponent,
    LoginComponent,
    AlertComponent,
    PasswordComponent,
    PasswordResetInitComponent,
    PasswordResetFinishComponent,
    ActivateComponent
  ],
  providers: [
    ConfigService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'/assets/i18n/');
}

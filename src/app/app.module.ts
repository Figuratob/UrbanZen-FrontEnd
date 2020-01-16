import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { HeaderModule } from './components/header/header.module';
import { TimetableModule } from './modules/application/timetable/timetable.module';
import { ConfigService } from './services/config/config.service';
import {BookingsModule} from './modules/general/bookings/bookings.module';
import {ScheduleModule} from './modules/general/schedule/schedule.module';
import {RegisterComponent} from "./modules/general/account/register/register.component";
import {SettingsComponent} from "./modules/general/account/settings/settings.component";
import {LoginComponent} from "./modules/general/account/login/login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AlertComponent} from "./components/alert/alert.component";
import {NgxWebstorageModule} from 'ngx-webstorage';
import {PasswordComponent} from "./modules/general/account/password/password.component";
import {JwtInterceptor} from "./components/jwt.interceptor";
import {ErrorInterceptor} from "./components/error.interceptor";

@NgModule({
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HeaderModule,
    TimetableModule,
    ScheduleModule,
    BookingsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    RegisterComponent,
    SettingsComponent,
    LoginComponent,
    AlertComponent,
    PasswordComponent
  ],
  providers: [
    ConfigService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}

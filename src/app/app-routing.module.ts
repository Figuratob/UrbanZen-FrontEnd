import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ScheduleComponent} from './general/schedule/schedule.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegisterComponent} from "./general/account/register/register.component";
import {SettingsComponent} from "./general/account/settings/settings.component";
import {LoginComponent} from "./general/account/login/login.component";
import {PasswordComponent} from "./general/account/password/password.component";
import {AuthGuard} from "./components/auth.guard";
import {PasswordResetInitComponent} from "./general/account/password-reset/init/password-reset-init.component";
import {ActivateComponent} from "./general/account/activate/activate.component";

const routes: Routes = [

  {path: '', component: ScheduleComponent},
  {
    path: 'teachers',
    loadChildren: () => import('./general/teachers/teachers.module').then(mod => mod.TeachersModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./general/bookings/bookings.module').then(mod => mod.BookingsModule), canActivate :[AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate',
    component: ActivateComponent
  },
  {
    path: 'settings',
    component: SettingsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'password',
    component: PasswordComponent, canActivate: [AuthGuard]
  },
  {
    path: 'reset',
    component: PasswordResetInitComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}

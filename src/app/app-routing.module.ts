import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ScheduleComponent} from './modules/schedule/schedule.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {RegisterComponent} from "./modules/account/register/register.component";
import {SettingsComponent} from "./modules/account/settings/settings.component";
import {LoginComponent} from "./modules/account/login/login.component";
import {PasswordComponent} from "./modules/account/password/password.component";
import {AuthGuard} from "./components/auth.guard";
import {PasswordResetInitComponent} from "./modules/account/password-reset/init/password-reset-init.component";
import {ActivateComponent} from "./modules/account/activate/activate.component";

const routes: Routes = [

  {path: '', component: ScheduleComponent},
  {
    path: 'teachers',
    loadChildren: () => import('./modules/teachers/teachers.module').then(mod => mod.TeachersModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./modules/bookings/bookings.module').then(mod => mod.BookingsModule), canActivate :[AuthGuard]
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

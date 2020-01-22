import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ScheduleComponent} from './modules/general/schedule/schedule.component';
import {NotFoundComponent} from './modules/general/not-found/not-found.component';
import {RegisterComponent} from "./modules/general/account/register/register.component";
import {SettingsComponent} from "./modules/general/account/settings/settings.component";
import {LoginComponent} from "./modules/general/account/login/login.component";
import {PasswordComponent} from "./modules/general/account/password/password.component";
import {AuthGuard} from "./components/auth.guard";

const routes: Routes = [

  {path: '', component: ScheduleComponent},
  {
    path: 'teachers',
    loadChildren: () => import('./modules/general/teachers/teachers.module').then(mod => mod.TeachersModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./modules/general/bookings/bookings.module').then(mod => mod.BookingsModule), canActivate :[AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/general/account/account.module').then(mod => mod.AccountModule)
  },
  {
    path: 'register',
    component: RegisterComponent,
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

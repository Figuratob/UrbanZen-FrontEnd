import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScheduleComponent } from './modules/general/schedule/schedule.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';

const routes: Routes = [

  { path: '', component: ScheduleComponent },
  {
    path: 'teachers',
    loadChildren: () => import('./modules/general/teachers/teachers.module').then(mod => mod.TeachersModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./modules/general/bookings/bookings.module').then(mod => mod.BookingsModule)
  },
  {
    path: 'my-account',
    loadChildren: () => import('./modules/general/my-account/my-account.module').then(mod => mod.MyAccountModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

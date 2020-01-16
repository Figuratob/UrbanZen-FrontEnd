import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleComponent} from './schedule.component';
import {ScheduleRoutingModule} from './schedule-routing.module';
import {TimetableModule} from '../../application/timetable/timetable.module';

@NgModule({
  declarations: [
    ScheduleComponent,

  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    TimetableModule
  ],
  exports: [
    ScheduleComponent
  ]
})

export class ScheduleModule {
}

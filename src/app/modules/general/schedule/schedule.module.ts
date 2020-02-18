import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScheduleComponent} from './schedule.component';
import {ScheduleRoutingModule} from './schedule-routing.module';
import {TimetableModule} from '../../application/timetable/timetable.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    ScheduleComponent,

  ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        TimetableModule,
        TranslateModule
    ],
  exports: [
    ScheduleComponent
  ]
})

export class ScheduleModule {
}

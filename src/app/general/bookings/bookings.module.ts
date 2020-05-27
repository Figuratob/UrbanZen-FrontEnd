import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingsComponent} from './bookings.component';
import {BookingsRoutingModule} from './bookings-routing.module';
import {TimetableModule} from '../../components/timetable/timetable.module';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    BookingsComponent,

  ],
    imports: [
        CommonModule,
        BookingsRoutingModule,
        TimetableModule,
        TranslateModule
    ],
  exports: [
    BookingsComponent
  ],
})

export class BookingsModule {
}

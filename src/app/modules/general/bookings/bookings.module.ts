import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsComponent } from './bookings.component';
import { BookingsRoutingModule } from './bookings-routing.module';
import {TimetableModule} from '../../application/timetable/timetable.module';

@NgModule({
  declarations: [
    BookingsComponent,

  ],
  imports: [
    CommonModule,
    BookingsRoutingModule,
    TimetableModule
  ],
  exports: [
    BookingsComponent
  ],
})

export class BookingsModule { }

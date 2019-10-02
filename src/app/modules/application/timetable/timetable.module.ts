import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './timetable.component';
import { TimetableRoutingModule } from './timetable-routing.module';
import {ModalWindowComponent} from '../../../components/modal-window/modal-window.component';
import {MatDialogModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {BookingConfirmationComponent} from '../../../components/booking-confirmation/booking-confirmation.component';
import {BookingCancellationComponent} from '../../../components/booking-cancellation/booking-cancellation.component';

@NgModule({
  declarations: [
    TimetableComponent,
    ModalWindowComponent,
    BookingConfirmationComponent,
    BookingCancellationComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule

  ],
  exports: [
    TimetableComponent
  ],
  entryComponents: [TimetableComponent, ModalWindowComponent, BookingConfirmationComponent, BookingCancellationComponent]

})
export class TimetableModule { }
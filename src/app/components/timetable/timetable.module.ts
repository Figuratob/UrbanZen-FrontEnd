import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimetableComponent} from './timetable.component';
import {TimetableRoutingModule} from './timetable-routing.module';
import {ModalWindowComponent} from '../modal-window/modal-window.component';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {BookingConfirmationComponent} from '../booking-confirmation/booking-confirmation.component';
import {BookingCancellationComponent} from '../booking-cancellation/booking-cancellation.component';
import {TranslateModule} from "@ngx-translate/core";

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
        MatIconModule,
        MatButtonModule,
        TranslateModule,

    ],
  exports: [
    TimetableComponent
  ],
  entryComponents: [TimetableComponent, ModalWindowComponent, BookingConfirmationComponent, BookingCancellationComponent]

})
export class TimetableModule {
}

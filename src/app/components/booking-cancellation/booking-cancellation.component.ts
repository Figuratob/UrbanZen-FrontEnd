import {Component, Inject} from '@angular/core';
import {Booking} from "../../model/booking.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Router} from "@angular/router";

export interface DialogData {
  showError: false;
  error: any;
  booking: Booking;
  parentComponent: any;
}

@Component({
  selector: 'app-booking-cancellation-component',
  templateUrl: 'booking-cancellation.component.html',
})

export class BookingCancellationComponent {
  booking: Booking;
  showError: false;
  error: any;

  constructor(
    public dialogRef: MatDialogRef<BookingCancellationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(Router) public router: Router) {

    this.router = router;
    this.booking = data.booking;
    this.error = data.error;
    this.showError = data.showError;
  }

  gotoBookings() {
    if (this.data.parentComponent) {
      this.data.parentComponent.refreshBookings();
    }
    this.dialogRef.close();
  }
}

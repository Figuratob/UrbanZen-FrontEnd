import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {Lesson} from '../../model/timetable.model';
import {Router} from '@angular/router';
import {Moment} from "moment";

export interface DialogData {
  lesson: Lesson;
  day: Moment;
}
@Component({
  selector: 'app-booking-confirmation-component',
  templateUrl: 'booking-confirmation.component.html',
})

export class BookingConfirmationComponent {

  lesson: Lesson;
  day: Moment;

  constructor(

    public dialogRef: MatDialogRef<BookingConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(Router) public router: Router) {

    this.router = router;
    this.lesson = data.lesson;
    this.day = data.day;
    }

  gotoBookings() {
    this.router.navigate(['/bookings']);
    this.dialogRef.close();
  }
}

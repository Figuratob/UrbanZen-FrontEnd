import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {Lesson} from '../../model/timetable.model';
import {BookingConfirmationComponent} from '../booking-confirmation/booking-confirmation.component';
import {BookingCancellationComponent} from '../booking-cancellation/booking-cancellation.component';
import {Moment} from "moment";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import { Booking } from 'src/app/model/booking.model';
import {User} from "../../model/user.model";
import {BookingService} from "../../modules/general/bookings/booking.service";

export interface DialogData {
  lesson: Lesson;
  day: Moment;
  showBookingModalNotCancelModal: boolean;
}
@Component({
  selector: 'app-modal-window-component',
  templateUrl: 'modal-window.component.html',
  providers: [BookingService]
})
export class ModalWindowComponent {

  lesson: Lesson;
  day: Moment;
  users: User[];


  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    protected bookingService: BookingService) {

    this.lesson = data.lesson;
    this.day = data.day;
    }

  openDialog(lesson: any, day: any, showBookingModalNotCancelModal: boolean): void {
    if (showBookingModalNotCancelModal) {
      const dialogRef = this.dialog.open(BookingConfirmationComponent, {
        width: '360px',
        data: {lesson , day, showBookingModalNotCancelModal}
      });
      const lessonId = this.lesson.id;
      this.subscribeToSaveResponse(this.bookingService.createBook(lessonId));
    } else {
      const dialogRef = this.dialog.open(BookingCancellationComponent, {
        width: '360px',
        data: {lesson, day, showBookingModalNotCancelModal}
      });
    }

    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Booking>>) {
    result.subscribe();
  }
}

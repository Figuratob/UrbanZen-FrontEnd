import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {Lesson} from '../../model/lesson.model';
import {BookingConfirmationComponent} from '../booking-confirmation/booking-confirmation.component';
import {BookingCancellationComponent} from '../booking-cancellation/booking-cancellation.component';
import {Moment} from "moment";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Booking} from 'src/app/model/booking.model';
import {BookingService} from "../../modules/general/bookings/booking.service";
import {LessonEntry} from "../../model/lesson-entry.model";

export interface DialogData {
  lesson: Lesson;
  lessonEntry: LessonEntry;
  day: Moment;
  showBookingModalNotCancelModal: boolean;
  parentComponent: any;
  showError: boolean;
  error: any;
}

@Component({
  selector: 'app-modal-window-component',
  templateUrl: 'modal-window.component.html',
  providers: [BookingService]
})
export class ModalWindowComponent {

  lessonEntry: LessonEntry;
  day: Moment;
  error: any;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    protected bookingService: BookingService) {

    this.lessonEntry = data.lessonEntry;
    this.day = data.day;
  }

  openDialog(lessonEntry: any, day: any, showBookingModalNotCancelModal: boolean): void {
    if (showBookingModalNotCancelModal) {

      this.subscribeToSaveResponse(this.bookingService.createBook(this.lessonEntry.lesson.id));

    } else {

      this.subscribeToCancelResponse(this.bookingService.cancel(this.lessonEntry.booking.id));

    }
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private subscribeToSaveResponse(result: Observable<HttpResponse<Booking>>) {
    result.subscribe((response) => {

      const dialogRef = this.dialog.open(BookingConfirmationComponent, {
        width: '360px',
        data: {lesson: response.body.lesson, error: null, showError: false}
      });

    }, (error: any) => {

      const dialogRef = this.dialog.open(BookingConfirmationComponent, {
        width: '360px',
        data: {error: error, showError: true}
      });
    });
  }

  private subscribeToCancelResponse(result: Observable<HttpResponse<Booking>>) {
    result.subscribe((response) => {

      const dialogRef = this.dialog.open(BookingCancellationComponent, {
        width: '360px',
        data: {
          lesson: response.body.lesson, booking: this.lessonEntry.booking,
          day: response.body.lesson.startDate, parentComponent: this.data.parentComponent
        }
      });

    }, (error: any) => {

      const dialogRef = this.dialog.open(BookingCancellationComponent, {
        width: '360px',
        data: {error: error, showError: true}
      })
    })
  }
}

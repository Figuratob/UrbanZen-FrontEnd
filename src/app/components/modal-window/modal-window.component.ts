import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { Lesson, Day} from '../../modules/application/timetable/timetable.component';
import {BookingConfirmationComponent} from '../booking-confirmation/booking-confirmation.component';
import {BookingCancellationComponent} from '../booking-cancellation/booking-cancellation.component';

export interface DialogData {
  lesson: Lesson;
  day: Day;
  showBookingModalNotCancelModal: boolean;
}
@Component({
  selector: 'app-modal-window-component',
  templateUrl: 'modal-window.component.html',
})
export class ModalWindowComponent {

  lesson: Lesson;
  day: Day;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.lesson = data.lesson;
    this.day = data.day;
    }

  openDialog(lesson: any, day: any, showBookingModalNotCancelModal: boolean): void {
    if (showBookingModalNotCancelModal) {
      const dialogRef = this.dialog.open(BookingConfirmationComponent, {
        width: '360px',
        data: {lesson , day, showBookingModalNotCancelModal}
      });

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
}

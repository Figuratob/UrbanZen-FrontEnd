import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit, Component, Inject} from '@angular/core';
import {Lesson} from '../../model/lesson.model';
import {BookingConfirmationComponent} from '../booking-confirmation/booking-confirmation.component';
import {BookingCancellationComponent} from '../booking-cancellation/booking-cancellation.component';
import {Moment} from "moment";
import {Observable} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {Booking} from 'src/app/model/booking.model';
import {BookingService} from "../../general/bookings/booking.service";
import {LessonEntry} from "../../model/lesson-entry.model";
import {TranslateService} from "@ngx-translate/core";
import {AuthenticationService} from "../../services/authentication.service";

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
export class ModalWindowComponent implements AfterViewInit {

  lessonEntry: LessonEntry;
  day: Moment;
  error: any;
  language: string;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    protected bookingService: BookingService,
    protected translateService: TranslateService,
    protected authenticationService: AuthenticationService) {
    this.lessonEntry = data.lessonEntry;
    this.day = data.day;
    this.language = translateService.currentLang;
  }

  ngAfterViewInit(): void {
    this.translateService.onLangChange.subscribe( LangChangeEvent => {
      this.language = LangChangeEvent.lang;
    });
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

      this.dialog.open(BookingConfirmationComponent, {
        width: '360px',
        data: {lesson: response.body.lesson, error: null, showError: false}
      });

    }, (error: any) => {

      this.dialog.open(BookingConfirmationComponent, {
        width: '360px',
        data: {error: error, showError: true}
      });
    });
  }

  private subscribeToCancelResponse(result: Observable<HttpResponse<Booking>>) {
    result.subscribe((response) => {

      this.dialog.open(BookingCancellationComponent, {
        width: '360px',
        data: {
          lesson: response.body.lesson, booking: this.lessonEntry.booking,
          day: response.body.lesson.startDate, parentComponent: this.data.parentComponent
        }
      });

    }, (error: any) => {

      this.dialog.open(BookingCancellationComponent, {
        width: '360px',
        data: {error: error, showError: true}
      })
    })
  }

  isAuthenticated() {
    let authenticated = this.authenticationService.isAuthenticated();
    return authenticated;
  }
}

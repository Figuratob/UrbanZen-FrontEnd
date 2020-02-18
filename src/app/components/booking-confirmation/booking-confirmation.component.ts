import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AfterViewInit, Component, Inject} from '@angular/core';
import {Lesson} from '../../model/lesson.model';
import {Router} from '@angular/router';
import {Moment} from "moment";
import {TranslateService} from "@ngx-translate/core";

export interface DialogData {
  showError: false;
  error: any;
  lesson: Lesson;
  day: Moment;
  language: string;
}
@Component({
  selector: 'app-booking-confirmation-component',
  templateUrl: 'booking-confirmation.component.html',
})

export class BookingConfirmationComponent implements AfterViewInit {

  lesson: Lesson;
  day: Moment;
  showError: false;
  error: any;
  language: string;

  constructor(
    public dialogRef: MatDialogRef<BookingConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(Router) public router: Router,
    protected translateService: TranslateService) {

    this.router = router;
    this.lesson = data.lesson;
    this.error = data.error;
    this.showError = data.showError;
    this.language = translateService.currentLang;
  }

  ngAfterViewInit (): void {
    this.translateService.onLangChange.subscribe(LangChangeEvent => {
      this.language = LangChangeEvent.lang;
    });
  }

  gotoBookings() {
    this.router.navigate(['/bookings']);
    this.dialogRef.close();
  }
}

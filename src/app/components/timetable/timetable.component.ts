import {AfterViewInit, Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalWindowComponent} from '../modal-window/modal-window.component';
import {Timetable} from '../../model/timetable.model';
import {LessonEntry} from "../../model/lesson-entry.model";
import * as moment from "moment";
import {Moment} from "moment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})

export class TimetableComponent implements AfterViewInit {

  @Input()
  showCaption: boolean;
  @Input()
  showBookingModalNotCancelModal: boolean;
  @Input()
  parentComponent: any;

  @Input()
  timetables: Timetable[];

  @Input()
  firstDayOfWeek: string;
  @Input()
  lastDayOfWeek: string;

  now: Moment;
  language: string;

  constructor(public dialog: MatDialog,
              protected translateService: TranslateService) {

    this.language = translateService.currentLang;
    this.now = moment();
  }

  ngAfterViewInit(): void {
    this.translateService.onLangChange.subscribe( LangChangeEvent => {
      this.language = LangChangeEvent.lang;
    });
  }

  openDialog(lessonEntry: LessonEntry, day: any, showBookingModalNotCancelModal: boolean): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      width: '360px',
      data: {lessonEntry: lessonEntry, day, showBookingModalNotCancelModal, parentComponent: this.parentComponent}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}



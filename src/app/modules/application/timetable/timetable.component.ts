import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalWindowComponent} from '../../../components/modal-window/modal-window.component';
import {Timetable} from '../../../model/timetable.model';
import {LessonEntry} from "../../../model/lesson-entry.model";
import * as moment from "moment";
import {Moment} from "moment";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
})

export class TimetableComponent {

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

  constructor(public dialog: MatDialog) {
    this.now = moment();
  }

  openDialog(lessonEntry: LessonEntry, day: any, showBookingModalNotCancelModal: boolean): void {
    const dialogRef = this.dialog.open(ModalWindowComponent, {
      width: '360px',
      data: {lessonEntry: lessonEntry, day, showBookingModalNotCancelModal, parentComponent: this.parentComponent}
    });

    dialogRef.afterClosed().subscribe(result => {
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}



import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalWindowComponent} from '../../../components/modal-window/modal-window.component';
import * as moment from 'moment';

export class Lesson {
  lessonDayOfWeek: string;
  lessonDate: string;
  lessonStartTime: string;
  lessonEndTime: string;
  nameOfLesson: string;
  booked: number;
  availableSpaces: number;
  lessonDescription: string;
  teacher: Teacher;

  constructor(lessonDayOfWeek: string, lessonDate: string, lessonStartTime: string,
              lessonEndTime: string, nameOfLesson: string, booked: number,
              availableSpaces: number, lessonDescription: string, teacher: Teacher) {
    this.lessonDayOfWeek = lessonDayOfWeek;
    this.lessonDate = lessonDate;
    this.lessonStartTime = lessonStartTime;
    this.lessonEndTime = lessonEndTime;
    this.nameOfLesson = nameOfLesson;
    this.booked = booked;
    this.availableSpaces = availableSpaces;
    this.lessonDescription = lessonDescription;
    this.teacher = teacher;
  }
}

export class Day {
  dayOfWeek: string;
  date: string;

  constructor(dayOfWeek: string, date: string) {
    this.dayOfWeek = dayOfWeek;
    this.date = date;
  }
}

export class Teacher {
  teacherId: number;
  name: string;
  aboutTeacher: string;
  photo: string;

  constructor(teacherId: number, name: string, description: string,
              photo: string) {
    this.teacherId = teacherId;
    this.name = name;
    this.aboutTeacher = description;
    this.photo = photo;
  }
}

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  @Input()
  showCaption: boolean;
  @Input()
  showBookingModalNotCancelModal = true;
  name: string;
  firstDayOfWeek: any;
  lastDayOfWeek: any;
  teachers = [
    {teacherId : 42,
      name: 'Anastassija',
      photo: 'data:image/jpeg;base64,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',
      aboutTeacher: ' '}];

  timetable = [
    {
      day:
        new Day ('Esmaspäev', '02.09.2019' ),
      lessons: [
        new Lesson( moment(new Date()).format('dddd'), moment(new Date()).format('DD.MM.YYYY'),
          moment(new Date()).format('HH:mm'), moment(new Date()).format('HH:mm'),
          'Kundalini Jooga',
          8, 10,
          'Kundalini jooga ehitab üles terve keha, arendab tasakaalustatud meelt,\n' +
          '    aitab võtta ühendust sinus peituva lõpmatusega ja sinu kaasasündinud\n' +
          '    sisemise tarkusega. Samuti avab see uksed, et saaksid ületada oma täit\n' +
          '    potentsiaali. See annab sulle elujõudu ja tervist, mis on sinu\n' +
          '    sünnipärane õigus.', this.getTeacherById(1))
      ]
    },
    {
      day:
        new Day ('Teisipäev', '03.09.2019'),
      lessons: [
        new Lesson( moment(new Date()).format('dddd'), moment(new Date()).format('DD.MM.YYYY'),
          moment(new Date()).format('HH:mm'), moment(new Date()).format('HH:mm'),
          'Kundalini Jooga', 2, 10,
          'Kundalini jooga ehitab üles terve keha, arendab tasakaalustatud meelt,\n' +
          '    aitab võtta ühendust sinus peituva lõpmatusega ja sinu kaasasündinud\n' +
          '    sisemise tarkusega. Samuti avab see uksed, et saaksid ületada oma täit\n' +
          '    potentsiaali. See annab sulle elujõudu ja tervist, mis on sinu\n' +
          '    sünnipärane õigus.', this.getTeacherById(1)),
        new Lesson( moment(new Date()).format('dddd'), moment(new Date()).format('DD.MM.YYYY'),
          moment(new Date()).format('HH:mm'), moment(new Date()).format('HH:mm'),
          'Kundalini Jooga', 2, 10,
          'Kundalini jooga ehitab üles terve keha, arendab tasakaalustatud meelt,\n' +
          '    aitab võtta ühendust sinus peituva lõpmatusega ja sinu kaasasündinud\n' +
          '    sisemise tarkusega. Samuti avab see uksed, et saaksid ületada oma täit\n' +
          '    potentsiaali. See annab sulle elujõudu ja tervist, mis on sinu\n' +
          '    sünnipärane õigus.', this.getTeacherById(1)),
      ]
    }];

  constructor(public dialog: MatDialog) {}

  openDialog(lesson: any, day: any, showBookingModalNotCancelModal: boolean): void {

        const dialogRef = this.dialog.open(ModalWindowComponent, {
          width: '360px',
          data: {lesson, day, showBookingModalNotCancelModal}
        });

        dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        });

        dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        });

}
  private getTeacherById(id: number): Teacher {
    return this.teachers[0];
  }

  ngOnInit(): void {
    this.firstDayOfWeek = (this.timetable[0]).day.date;
    this.lastDayOfWeek = (this.timetable[this.timetable.length - 1]).day.date;
   }
}






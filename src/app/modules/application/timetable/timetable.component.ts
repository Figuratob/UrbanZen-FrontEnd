import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ModalWindowComponent} from '../../../components/modal-window/modal-window.component';
import {HttpResponse} from "@angular/common/http";
import {Timetable} from '../../../model/timetable.model';
import {TimetableService} from "./timetable.service";
import {filter, map} from "rxjs/operators";


@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css'],
  providers: [TimetableService]
})

export class TimetableComponent implements OnInit {

  @Input()
  showCaption: boolean;
  @Input()
  showBookingModalNotCancelModal = true;
  name: string;
  firstDayOfWeek: any;
  lastDayOfWeek: any;

  timetables: Timetable[];

  // timetables = [
  //   {
  //     timetableDay:  moment('09.02.2019'),
  //
  //     lessons: [
  //       new Lesson( moment(new Date()).format('dddd'), moment(new Date()).format('DD.MM.YYYY'),
  //         moment(new Date()).format('HH:mm'), moment(new Date()).format('HH:mm'),
  //         'Kundalini Jooga',
  //         8, 10,
  //         'Kundalini jooga ehitab üles terve keha, arendab tasakaalustatud meelt,\n' +
  //         '    aitab võtta ühendust sinus peituva lõpmatusega ja sinu kaasasündinud\n' +
  //         '    sisemise tarkusega. Samuti avab see uksed, et saaksid ületada oma täit\n' +
  //         '    potentsiaali. See annab sulle elujõudu ja tervist, mis on sinu\n' +
  //         '    sünnipärane õigus.', new Teacher(12,"Masha","",""))
  //     ]
  //   },
  //   {
  //     timetableDay: moment('09.03.2019'),
  //     lessons: [
  //       new Lesson( moment(new Date()).format('dddd'), moment(new Date()).format('DD.MM.YYYY'),
  //         moment(new Date()).format('HH:mm'), moment(new Date()).format('HH:mm'),
  //         'Kundalini Jooga', 2, 10,
  //         'Kundalini jooga ehitab üles terve keha, arendab tasakaalustatud meelt,\n' +
  //         '    aitab võtta ühendust sinus peituva lõpmatusega ja sinu kaasasündinud\n' +
  //         '    sisemise tarkusega. Samuti avab see uksed, et saaksid ületada oma täit\n' +
  //         '    potentsiaali. See annab sulle elujõudu ja tervist, mis on sinu\n' +
  //         '    sünnipärane õigus.', new Teacher(13,'Anastassja','','')),
  //       new Lesson( moment(new Date()).format('dddd'), moment(new Date()).format('DD.MM.YYYY'),
  //         moment(new Date()).format('HH:mm'), moment(new Date()).format('HH:mm'),
  //         'Kundalini Jooga', 2, 10,
  //         'Kundalini jooga ehitab üles terve keha, arendab tasakaalustatud meelt,\n' +
  //         '    aitab võtta ühendust sinus peituva lõpmatusega ja sinu kaasasündinud\n' +
  //         '    sisemise tarkusega. Samuti avab see uksed, et saaksid ületada oma täit\n' +
  //         '    potentsiaali. See annab sulle elujõudu ja tervist, mis on sinu\n' +
  //         '    sünnipärane õigus.', new Teacher(14,'Yelena','','')),
  //     ]
  //   }];
  constructor(private timetableService: TimetableService,
              public dialog: MatDialog ) {}

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

  ngOnInit(): void {
    this.timetableService
      .query()
      .pipe(
        filter((res: HttpResponse<Timetable[]>) => res.ok),
        map((res: HttpResponse<Timetable[]>) => res.body)
      )
      .subscribe((data:Timetable[])=>{
        this.timetables=data;
        console.log("from inside component: ", this.timetables);
    });
   }

  // ngOnInit(): void {
  //   this.timetableService.getData().subscribe((data:Timetable[])=>this.timetables=data);
  //   // this.firstDayOfWeek = (this.timetables[0]).timetableDay;
  //   // this.lastDayOfWeek = (this.timetables[this.timetables.length - 1]).timetableDay;
  // }

}



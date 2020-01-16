import {Component, OnInit} from '@angular/core';
import {BookingService} from "./booking.service";
import {Timetable} from "../../../model/timetable.model";
import {filter, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import {Booking} from "../../../model/booking.model";
import * as moment from 'moment';
import {LessonEntry} from "../../../model/lesson-entry.model";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  providers: [BookingService]
})

export class BookingsComponent implements OnInit {
  timetables: Timetable[];

  constructor(private bookingService: BookingService) {
  }

  ngOnInit(): void {
    this.refreshBookings();
  }

  refreshBookings() {
    this.bookingService
      .query()
      .pipe(
        filter((res: HttpResponse<Booking[]>) => res.ok),
        map((res: HttpResponse<Booking[]>) => this.mapToTimetable(res))
      )
      .subscribe((data: Timetable[]) => {
        this.timetables = data;
      });
  }

  private mapToTimetable(res: HttpResponse<Booking[]>) {
    let bookings = res.body;
    if (!bookings || bookings.length == 0) {
      return;
    }
    let timetables = [];
    bookings.forEach((booking: Booking) => {
      let lessonStartDate = moment(booking.lesson.startDate);
      let timetable: Timetable;
      timetables.forEach((t: Timetable) => {
        let timetableDate = t.timetableDay;
        if (lessonStartDate.startOf('day').isSame(timetableDate.startOf('day'))) {
          timetable = t;
          return;
        }
      });
      if (timetable) {
        timetable.lessonEntries.push(new LessonEntry(booking, booking.lesson));
      } else {
        let lessonEntry = new LessonEntry(booking, booking.lesson);
        timetables.push(new Timetable(booking.lesson.startDate, Array.from([lessonEntry])))
      }
    });
    return timetables;
  }
}

import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Timetable} from "../../model/timetable.model";
import {filter, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import * as moment from "moment";
import {TimetableDTO} from "../../model/timetableDTO.model";
import {LessonEntry} from "../../model/lesson-entry.model";
import {Lesson} from "../../model/lesson.model";
import { Moment } from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleService]
})

export class ScheduleComponent implements OnInit {
  showCaption: boolean;
  timetables: Timetable[];
  firstDayOfWeek: Moment;
  lastDayOfWeek: Moment;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.showCaption = true;

    let now = moment();
    let thisMonday = moment(now).startOf('isoWeek');
    let thisSunday = moment(now).endOf('isoWeek');

    this.firstDayOfWeek = thisMonday;
    this.lastDayOfWeek = thisSunday;

    this.refreshTimetable(thisMonday, thisSunday);
  }

  public refreshTimetable(firstDayOfWeek: Moment, lastDayOfWeek: Moment) {
    this.scheduleService
      .getData(firstDayOfWeek,lastDayOfWeek)
      .pipe(
        filter((res: HttpResponse<TimetableDTO[]>) => res.ok),
        map((res: HttpResponse<TimetableDTO[]>) => this.mapToTimetable(res))
      )
      .subscribe((data: Timetable[]) => {
        this.timetables = data;
        this.firstDayOfWeek = moment(this.timetables[0].timetableDay);
        this.lastDayOfWeek = moment(this.timetables[6].timetableDay);
      });
  }

  private mapToTimetable(res: HttpResponse<TimetableDTO[]>) {
    let timetableDTOs = res.body;
    if (!timetableDTOs || timetableDTOs.length == 0) {
      return;
    }
    let timetables = [];
    timetableDTOs.forEach((timetableDTO: TimetableDTO) => {
      let lessonEntries = [];
      timetables.push(new Timetable(timetableDTO.timetableDay, lessonEntries));
      if (!timetableDTO.lessons || timetableDTO.lessons.length == 0) {
        return;
      }
      timetableDTO.lessons.forEach((l: Lesson) => {
        let lessonEntry = new LessonEntry(null, l);
        lessonEntries.push(lessonEntry);
      });
    });
    return timetables;
  }

  previousWeek(firstDayOfWeek: Moment, lastDayOfWeek: Moment) {

    let previousMonday = moment(firstDayOfWeek).subtract(7,'days');
    let previousSunday = moment(lastDayOfWeek).subtract(7,'days');

    this.refreshTimetable(previousMonday, previousSunday);
  }

  nextWeek(firstDayOfWeek: Moment, lastDayOfWeek: Moment) {

    let nextMonday = moment(firstDayOfWeek).add(7,'days');
    let nextSunday = moment(lastDayOfWeek).add(7,'days');

    this.refreshTimetable(nextMonday, nextSunday);
  }
}



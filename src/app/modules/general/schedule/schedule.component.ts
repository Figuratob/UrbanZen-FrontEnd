import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "./schedule.service";
import {Timetable} from "../../../model/timetable.model";
import {filter, map} from "rxjs/operators";
import {HttpResponse} from "@angular/common/http";
import * as moment from "moment";
import {TimetableDTO} from "../../../model/timetableDTO.model";
import {LessonEntry} from "../../../model/lesson-entry.model";
import {Lesson} from "../../../model/lesson.model";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleService]
})

export class ScheduleComponent implements OnInit {
  timetables: Timetable[];
  firstDayOfWeek: any;
  lastDayOfWeek: any;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.scheduleService
      .query()
      .pipe(
        filter((res: HttpResponse<TimetableDTO[]>) => res.ok),
        map((res: HttpResponse<TimetableDTO[]>) => this.mapToTimetable(res))
      )
      .subscribe((data: Timetable[]) => {
        this.timetables = data;
        this.firstDayOfWeek = moment(this.timetables[0].timetableDay).format('DD.MM.YYYY');
        this.lastDayOfWeek = moment(this.timetables[6].timetableDay).format('DD.MM.YYYY');
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
}



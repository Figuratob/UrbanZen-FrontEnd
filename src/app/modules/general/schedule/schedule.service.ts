import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Lesson} from "../../../model/lesson.model";
import * as moment from "moment";
import {TimetableDTO} from "../../../model/timetableDTO.model";
import { Moment } from 'moment';

type EntityArrayResponseType = HttpResponse<TimetableDTO[]>;

@Injectable()
export class ScheduleService {

  constructor(protected http: HttpClient) {
  }

  getData(firstDayOfWeek: Moment, lastDayOfWeek: Moment): Observable<EntityArrayResponseType> {

    let firstDayOfWeekFormatted = firstDayOfWeek.format('YYYY-MM-DD');
    let lastDayOfWeekFormatted = lastDayOfWeek.format('YYYY-MM-DD');

    let params = {
      firstDayOfWeek: firstDayOfWeekFormatted,
      lastDayOfWeek: lastDayOfWeekFormatted
    }
    return this.http
      .get<TimetableDTO[]>('http://localhost:8080/api/getTimetableByDates', {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  // query(req?: any): Observable<EntityArrayResponseType> {
  //   return this.http
  //     .get<TimetableDTO[]>('http://localhost:8080/api/getTimetable', {observe: 'response'})
  //     .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  // }

  private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((timetableDTO: TimetableDTO) => {
        timetableDTO.timetableDay = timetableDTO.timetableDay != null ? moment(timetableDTO.timetableDay) : null;
        if (timetableDTO.lessons) {
          timetableDTO.lessons.forEach((lesson: Lesson) => {
            lesson.startDate = lesson.startDate != null ? moment(lesson.startDate) : null;
            lesson.endDate = lesson.endDate != null ? moment(lesson.endDate) : null;
          });
        }
      });
    }
    return res;
  }
}


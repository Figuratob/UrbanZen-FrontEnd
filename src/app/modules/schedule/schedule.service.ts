import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Lesson} from "../../model/lesson.model";
import * as moment from "moment";
import {TimetableDTO} from "../../model/timetableDTO.model";
import { Moment } from 'moment';
import {ConfigService} from "../../services/config/config.service";

type EntityArrayResponseType = HttpResponse<TimetableDTO[]>;

@Injectable()
export class ScheduleService {

  constructor(protected http: HttpClient, protected configService: ConfigService) {
  }

  getData(firstDayOfWeek: Moment, lastDayOfWeek: Moment): Observable<EntityArrayResponseType> {

    let firstDayOfWeekFormatted = firstDayOfWeek.format('YYYY-MM-DD');
    let lastDayOfWeekFormatted = lastDayOfWeek.format('YYYY-MM-DD');

    let params = {
      firstDayOfWeek: firstDayOfWeekFormatted,
      lastDayOfWeek: lastDayOfWeekFormatted
    };
    return this.http
      .get<TimetableDTO[]>(this.configService.config.url + 'api/getTimetableByDates', {params, observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

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


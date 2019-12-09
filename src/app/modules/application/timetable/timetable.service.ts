import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Timetable} from "../../../model/timetable.model";
import {Lesson} from "../../../model/lesson.model";
import * as moment from "moment";

type EntityArrayResponseType = HttpResponse<Timetable[]>;

@Injectable()
export class TimetableService {

  constructor(protected http: HttpClient) {
  }

  getData() {
    return this.http.get('http://localhost:8080/api/getTimetable')

  }

  query(req?: any): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http
      .get<Timetable[]>('http://localhost:8080/api/getTimetable', {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertToTimetable(res)));
  }


  private convertToTimetable(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((timetable: Timetable) => {
        timetable.timetableDay = timetable.timetableDay != null ? moment(timetable.timetableDay) : null;
        if (timetable.lessons) {
          timetable.lessons.forEach((lesson: Lesson) => {
            lesson.startDate = lesson.startDate != null ? moment(lesson.startDate) : null;
            lesson.endDate = lesson.endDate != null ? moment(lesson.endDate) : null;
          });
        }
      });
    }
    return res;
  }

}



// res.body.forEach((timetable: Timetable) => {
//   let timetables = [];
//   if (res.body) {
//     for (let i = 0; i < res.body.length; i++) {
//       this.timetable = new Timetable(null,null);
//       this.timetable = new Timetable(res.body)
//     }
//   }
// });

// return [new Timetable(null,null), new Timetable(null,null), new Timetable(null,null)];

// return timetables;

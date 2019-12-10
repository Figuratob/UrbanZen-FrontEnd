import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../../../model/booking.model";
import {map} from "rxjs/operators";
import * as moment from 'moment';

type EntityResponseType = HttpResponse<Booking>;

@Injectable()
export class BookingService {
  constructor(protected http: HttpClient) {}

  createBook(lessonId: number): Observable<EntityResponseType> {
    const lesson = {
      lessonId: lessonId
    };
    return this.http
      .post<Booking>('http://localhost:8080/api/bookings/new', lessonId,{observe: 'response'})
      .pipe(map((res:EntityResponseType)=>this.convertDateFromServer(res)));
  }

protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reservationDate = res.body.reservationDate !=null ? moment(res.body.reservationDate): null;
      res.body.cancelDate = res.body.cancelDate !=null ? moment(res.body.cancelDate): null;
    }
  return res;
}
}

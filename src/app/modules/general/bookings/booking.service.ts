import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../../../model/booking.model";
import {map} from "rxjs/operators";
import * as moment from 'moment';

type EntityResponseType = HttpResponse<Booking>;
type EntityArrayResponseType = HttpResponse<Booking[]>;

@Injectable()
export class BookingService {
  constructor(protected http: HttpClient) {
  }

  createBook(lessonId: number): Observable<EntityResponseType> {
    const lesson = {
      lessonId: lessonId
    };
    return this.http
      .post<Booking>('http://localhost:8080/api/bookings/new', lessonId, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.reservationDate = res.body.reservationDate != null ? moment(res.body.reservationDate) : null;
      res.body.cancelDate = res.body.cancelDate != null ? moment(res.body.cancelDate) : null;
      res.body.lesson.startDate = res.body.lesson.startDate != null ? moment(res.body.lesson.startDate) : null;
      res.body.lesson.endDate = res.body.lesson.endDate != null ? moment(res.body.lesson.endDate) : null;
    }
    return res;
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http
      .get<Booking[]>('http://localhost:8080/api/userBookings', {observe: 'response'})
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {

    if (res.body) {
      res.body.forEach((booking: Booking) => {
        booking.reservationDate = booking.reservationDate != null ? moment(booking.reservationDate) : null;
        booking.cancelDate = booking.cancelDate != null ? moment(booking.cancelDate) : null;
        booking.lesson.startDate = booking.lesson.startDate != null ? moment(booking.lesson.startDate) : null;
        booking.lesson.endDate = booking.lesson.endDate != null ? moment(booking.lesson.endDate) : null;
      });
    }
    return res;
  }

  cancel(bookingId: number): Observable<EntityResponseType> {
    return this.http
      .put<Booking>('http://localhost:8080/api/bookings/' + bookingId + '/cancel', null, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
}

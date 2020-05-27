import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "../../model/booking.model";
import {map} from "rxjs/operators";
import * as moment from 'moment';
import {ConfigService} from "../../services/config.service";

type EntityResponseType = HttpResponse<Booking>;
type EntityArrayResponseType = HttpResponse<Booking[]>;

@Injectable()
export class BookingService {
  constructor(protected http: HttpClient, protected configService: ConfigService) {
  }

  createBook(lessonId: number): Observable<EntityResponseType> {
    return this.http
      .post<Booking>(this.configService.config.url + 'api/bookings/new', lessonId, {observe: 'response'})
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
    return this.http
      .get<Booking[]>(this.configService.config.url + 'api/userBookings', {observe: 'response'})
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
      .put<Booking>(this.configService.config.url + 'api/bookings/' + bookingId + '/cancel', null, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
}

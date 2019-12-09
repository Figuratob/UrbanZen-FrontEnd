import {Moment} from "moment";
import {Lesson} from "./lesson.model";
import { User } from './user.model';


export class Booking {
  constructor(id: number, reservationDate: Moment, cancelDate: Moment, user: User, lesson: Lesson) {
    this.id = id;
    this.reservationDate = reservationDate;
    this.cancelDate = cancelDate;
    this.user = user;
    this.lesson = lesson;
  }
  id: number;
  reservationDate: Moment;
  cancelDate: Moment;
  user: User;
  lesson: Lesson;

}

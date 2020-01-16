import {Moment} from "moment";
import {Teacher} from "./teacher.model";
import {Booking} from "./booking.model";

export class Lesson {

  id: number;
  startDate: Moment;
  endDate: Moment;
  name: string;
  description: string;
  street: string;
  city: string;
  availableSpaces: number;
  remainSpaces: number;
  bookings: Booking[];
  teacher: Teacher;

  constructor(
    id: number,
    startDate: Moment,
    endDate: Moment,
    name: string,
    remainSpaces: number,
    availableSpaces: number,
    description: string,
    teacher: Teacher,
    bookings: Booking[]) {

    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.name = name;
    this.remainSpaces = remainSpaces;
    this.availableSpaces = availableSpaces;
    this.description = description;
    this.teacher = teacher;
    this.bookings = bookings;
  }
}

import {Moment} from "moment";
import {Teacher} from "./teacher.model";
import {Booking} from "./booking.model";

export class Lesson {

  id: number;
  startDate: Moment;
  endDate: Moment;
  name: string;
  nameEng: string;
  nameRus: string;
  description: string;
  descriptionEng: string;
  descriptionRus: string;
  street: string;
  streetEng: string;
  streetRus: string;
  city: string;
  cityEng: string;
  cityRus: string;
  availableSpaces: number;
  remainSpaces: number;
  bookings: Booking[];
  teacher: Teacher;

  constructor(
    id: number,
    startDate: Moment,
    endDate: Moment,
    name: string,
    nameEng: string,
    nameRus: string,
    description: string,
    descriptionEng: string,
    descriptionRus: string,
    street: string,
    streetEng: string,
    streetRus: string,
    city: string,
    cityEng: string,
    cityRus: string,
    remainSpaces: number,
    availableSpaces: number,
    teacher: Teacher,
    bookings: Booking[]) {

    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.name = name;
    this.nameEng = nameEng;
    this.nameRus = nameRus;
    this.description = description;
    this.descriptionEng = descriptionEng;
    this.descriptionRus = descriptionRus;
    this.street = street;
    this.streetEng = streetEng;
    this.streetRus = streetRus;
    this.city = city;
    this.cityEng = cityEng;
    this.cityRus = cityRus;
    this.remainSpaces = remainSpaces;
    this.availableSpaces = availableSpaces;
    this.teacher = teacher;
    this.bookings = bookings;
  }
}

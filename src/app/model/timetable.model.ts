import {Moment} from "moment";
import { Lesson } from './lesson.model';

export class Timetable {
  timetableDay: Moment;
  lessons: Lesson[];

  constructor(timetableDay: Moment, lessons: Lesson[]) {
    this.timetableDay = timetableDay;
    this.lessons = lessons;
  }
}






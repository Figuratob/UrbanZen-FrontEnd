import {Moment} from "moment";
import {LessonEntry} from "./lesson-entry.model";

export class Timetable {
  timetableDay: Moment;
  lessonEntries: LessonEntry[]

  constructor(timetableDay: Moment, lessonEntries: LessonEntry[]) {
    this.timetableDay = timetableDay;
    this.lessonEntries = lessonEntries;
  }
}






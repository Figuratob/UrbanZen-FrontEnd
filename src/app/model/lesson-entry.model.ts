import {Lesson} from "./lesson.model";
import {Booking} from "./booking.model";

export class LessonEntry {
  booking: Booking;
  lesson: Lesson;

  constructor(booking: Booking, lesson: Lesson) {
    this.booking = booking;
    this.lesson = lesson;
  }
}

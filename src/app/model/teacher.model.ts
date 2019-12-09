import {Lesson} from './lesson.model';

export class Teacher {

  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  photo: any;
  photoContentType: string;
  lessons: Lesson[];
  about: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    photo: any,
    photoContentType: string,
    lessons: any,
    about: string) {

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.photo = photo;
    this.photoContentType = photoContentType;
    this.lessons = lessons;
    this.about = about;

  }
}

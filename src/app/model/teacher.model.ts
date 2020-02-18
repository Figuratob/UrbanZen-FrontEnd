import {Lesson} from './lesson.model';

export class Teacher {

  id: number;
  firstName: string;
  firstNameEng: string;
  firstNameRus: string;
  lastName: string;
  lastNameEng: string;
  lastNameRus: string;
  email: string;
  phone: string;
  photo: any;
  photoContentType: string;
  lessons: Lesson[];
  about: string;
  aboutEng: string;
  aboutRus: string;

  constructor(
    id: number,
    firstName: string,
    firsNameEng: string,
    firstNameRus: string,
    lastName: string,
    lastNameEng: string,
    lastNameRus: string,
    email: string,
    phone: string,
    photo: any,
    photoContentType: string,
    lessons: any,
    about: string,
    aboutEng: string,
    aboutRus: string) {

    this.id = id;
    this.firstName = firstName;
    this.firstNameEng = firsNameEng;
    this.firstNameRus = firstNameRus;
    this.lastName = lastName;
    this.lastNameEng = lastNameEng;
    this.lastNameRus = lastNameRus;
    this.email = email;
    this.phone = phone;
    this.photo = photo;
    this.photoContentType = photoContentType;
    this.lessons = lessons;
    this.about = about;
    this.aboutEng = aboutEng;
    this.aboutRus = aboutRus
  }
}

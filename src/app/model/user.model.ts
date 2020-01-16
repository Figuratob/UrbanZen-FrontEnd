import {Moment} from "moment";

export class User {
  id: number;
  login: number;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  langKey: string;
  authorities: any[];
  createdBy: string;
  createdDate: Moment;
  lastModifiedBy: string;
  lastModifiedDate: Moment;
  password: string;
  token: string;

  constructor(id: number, login: number, firstName: string, lastName: string, email: string, activated: boolean,
              langKey: string, authorities: any[], createdBy: string, createdDate: Moment,
              lastModifiedBy: string, lastModifiedDate: Moment, password: string, token: string) {
    this.id = id;
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.activated = activated;
    this.langKey = langKey;
    this.authorities = authorities;
    this.createdBy = createdBy;
    this.createdDate = createdDate;
    this.lastModifiedBy = lastModifiedBy;
    this.lastModifiedDate = lastModifiedDate;
    this.password = password;
    this.token = token;
  }
}

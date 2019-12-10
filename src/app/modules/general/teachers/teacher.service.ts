import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Teacher} from "../../../model/teacher.model";
import {HttpClient, HttpResponse} from "@angular/common/http";

type EntityArrayResponseType = HttpResponse<Teacher[]>;

@Injectable()
export class TeacherService {

  constructor(protected http: HttpClient) {
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http
      .get<Teacher[]>('http://localhost:8080/api/teachers', {observe: 'response'})

  }
}

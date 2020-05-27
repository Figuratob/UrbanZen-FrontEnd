import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Teacher} from '../../model/teacher.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ConfigService} from "../../services/config/config.service";

type EntityArrayResponseType = HttpResponse<Teacher[]>;

@Injectable()
export class TeacherService {

  constructor(protected http: HttpClient, protected configService: ConfigService) {
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    // const options = createRequestOption(req);
    return this.http
      .get<Teacher[]>(this.configService.config.url + 'api/teachers', {observe: 'response'})
  }

}

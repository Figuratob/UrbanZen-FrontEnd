import {AfterViewInit, Component} from '@angular/core';
import {Teacher} from "../../model/teacher.model";
import {HttpResponse} from "@angular/common/http";
import {filter, map} from "rxjs/operators";
import {TeacherService} from "./teacher.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  providers: [TeacherService]
})
export class TeachersComponent implements AfterViewInit {
  teachers: Teacher[];
  language: string;

  constructor(
    protected teacherService: TeacherService,
    protected translateService: TranslateService) {

    this.language = translateService.currentLang;
  }

  ngAfterViewInit(): void {
    this.translateService.onLangChange.subscribe( LangChangeEvent => {
      this.language = LangChangeEvent.lang;
    });
    this.loadAll();
  }

  private loadAll() {
    this.teacherService
      .query()
      .pipe(
        filter((res: HttpResponse<Teacher[]>) => res.ok),
        map((res: HttpResponse<Teacher[]>) => res.body)
      )
      .subscribe(
        (res: Teacher[]) => {
          this.teachers = res;
        }
      )
  }
}

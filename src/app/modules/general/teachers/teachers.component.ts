import {Component, OnInit} from '@angular/core';
import {Teacher} from "../../../model/teacher.model";
import {HttpResponse} from "@angular/common/http";
import {filter, map} from "rxjs/operators";
import {TeacherService} from "./teacher.service";

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
  providers: [TeacherService]
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[];


  constructor(
    protected teacherService: TeacherService) {
  }

  ngOnInit(): void {
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

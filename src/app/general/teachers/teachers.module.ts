import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    TeachersComponent
  ],
    imports: [
        CommonModule,
        TeachersRoutingModule,
        TranslateModule
    ],
  exports: [
    TeachersComponent
  ],
})

export class TeachersModule { }

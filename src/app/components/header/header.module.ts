import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderRoutingModule} from './header-routing.module';
import {HeaderComponent} from './header.component';
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HeaderComponent,

  ],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        NgbDropdownModule,
        NgbCollapseModule,
        MatButtonToggleModule,
        TranslateModule,
    ],
  exports: [
    HeaderComponent
  ],
})
export class HeaderModule {
}

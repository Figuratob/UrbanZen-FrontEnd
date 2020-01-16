import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderRoutingModule} from './header-routing.module';
import {HeaderComponent} from './header.component';
import {NgbCollapseModule, NgbDropdownModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule,
    NgbDropdownModule,
    NgbCollapseModule
  ],
  exports: [
    HeaderComponent
  ],
})
export class HeaderModule {
}

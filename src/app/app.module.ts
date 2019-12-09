import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { HeaderModule } from './components/header/header.module';
import { TimetableModule } from './modules/application/timetable/timetable.module';
import { ConfigService } from './services/config/config.service';
import {BookingsModule} from './modules/general/bookings/bookings.module';
import {ScheduleModule} from './modules/general/schedule/schedule.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HeaderModule,
    TimetableModule,
    ScheduleModule,
    BookingsModule
  ],
  providers: [
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

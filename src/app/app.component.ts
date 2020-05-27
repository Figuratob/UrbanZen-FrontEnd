import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Urban Zen Studio';

  constructor(public translateService: TranslateService) {

    translateService.addLangs(['et', 'en', 'ru']);
    translateService.setDefaultLang('et');

    translateService.use((translateService.currentLang == undefined) || (localStorage.getItem('lang') == null) ?
    (translateService.defaultLang) : (translateService.currentLang || localStorage.getItem('lang')));
  }
}

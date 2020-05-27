import {Component, Input} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  @Input() title: any;

  languages = [];
  public isNavbarCollapsed = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private translateService: TranslateService,
  ) {
    this.languages = translateService.getLangs();

    let lang = localStorage.getItem('lang');
    if (lang) {
      this.translateService.use(lang);
    }
    else this.translateService.use('et');
  }

  logout() {
    this.isNavbarCollapsed = true;
    this.authenticationService.logout();
    this.translateService.use(this.translateService.defaultLang);
    this.router.navigate(['']);
  }

  login() {
    this.isNavbarCollapsed = true;
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    let authenticated = this.authenticationService.isAuthenticated();
    return authenticated;
  }

  changeLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
  }
}

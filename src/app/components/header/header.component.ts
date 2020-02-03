import {Component, Input} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from "@angular/router";
import {AccountService} from "../../modules/general/account/account.service";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title: any;

  public isNavbarCollapsed = true;

  constructor(
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  logout() {
    this.isNavbarCollapsed = true;
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  login() {
    this.router.navigate(['login']);
  }

  isAuthenticated() {
    // console.log('header component is authenticated called ' + this.accountService.isAuthenticated());
    let authenticated = this.accountService.isAuthenticated();
    return authenticated;
  }
}

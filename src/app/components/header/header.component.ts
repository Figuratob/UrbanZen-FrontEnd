import {Component, Input} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {AccountService} from "../../modules/general/account/account.service";
import {SessionStorageService} from "ngx-webstorage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() title: any;
  isNavbarCollapsed: boolean = false;


  currentUser: User;

  constructor(
    // private loginService: LoginService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    // private profileService: ProfileService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.isNavbarCollapsed = true;
  }

  logout() {
    this.collapseNavbar();
    this.authenticationService.logout();
    this.router.navigate(['']);

  }

  collapseNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  // login() {
  //   // this.modalRef = this.loginModalService.open();
  // }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }
}

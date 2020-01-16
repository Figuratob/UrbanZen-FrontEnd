import {Component, OnInit} from "@angular/core";
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {AuthenticationService} from "../../../../services/authentication.service";
import {AlertService} from "../../../../services/alert.service";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  error: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.getToken()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.alertService.error('Your email is invalid');
      return;
    }

    this.loading = true;

    const password = this.registerForm.get(['password']).value;
    if (password !== this.registerForm.get(['confirmPassword']).value) {

      this.alertService.error('The password and its confirmation do not match');

    } else {

      let registerAccount = {};
      const login = this.registerForm.get(['email']).value;
      const email = this.registerForm.get(['email']).value;
      const password = this.registerForm.get(['password']).value;
      const langKey = 'et';
      registerAccount = {...registerAccount, login, email, password, langKey};

      this.userService.register(registerAccount)
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful. Please check your email for confirmation.', true);
            this.router.navigate(['/login']);
          },
          error => {

            this.alertService.error('Email is already in use!')
            this.loading = false;

          });
    }
    this.loading = false;
  }
}


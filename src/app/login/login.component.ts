import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logout = true;
  disableBtn = false;
  generalError: string | boolean = false;
  loginForm: FormGroup;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private loading: LoadingService
  ) {
    this.loading.toggleLoading(false);
   }

  ngOnInit() {

    this.loginService.auth.subscribe( r => {
      if ( r ) {
        console.log('logged in');
      } else {
        console.log('logged out');
      }
    });

    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {

    if ( !this.loginForm.controls['username'].valid ) {
      this.loginForm.controls['username'].markAsTouched();
    }
    if ( !this.loginForm.controls['password'].valid ) {
      this.loginForm.controls['password'].markAsTouched();
    }

    if ( this.loginForm.controls['username'].valid && this.loginForm.controls['password'].valid ) {
      this.disableBtn = true;
      this.generalError = false;
      this.loginService
        .login(this.loginForm.controls['username'].value, this.loginForm.controls['password'].value)
        .then( r => {
          this.disableBtn = false;
          if ( !r.valid ) {
            this.generalError = r.message;
          } else {
            this.router.navigate(['/dashboard']);
          }
        }) ;
    }
}

  onLogout() {
    this.loginService.logOut();
  }

}

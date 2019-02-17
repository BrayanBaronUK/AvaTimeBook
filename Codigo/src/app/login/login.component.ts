import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //loginForm: FormGroup;
  //errorMessage: string = '';
  public email: string;
  public password: string;
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public flashMensaje: FlashMessagesService
  ) { 
    //this.createForm();
  }
  onSubmitLogin() {
    this.authService.dologin(this.email, this.password)
    .then( (res) => {
      this.flashMensaje.show('Usuario logado correctamente.',
      {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/social']);
    }).catch((err) => {
      this.flashMensaje.show(err.message,
      {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/login']);
    });
  }

  onClickGoogleLogin() {
   this.authService.doGoogleLogin()
    .then((res) => {
        this.router.navigate(['/social']);
    }).catch( err => console.log(err.message));
  }

  onClickFacebookLogin() {
    this.authService.doFacebookLogin()
      .then((res) => {
          this.router.navigate(['/social']);
      }).catch( err => console.log(err.message));
  }

  onClickTwitterLogin() {
    this.authService.doTwitterLogin()
      .then((res) => {
        this.router.navigate(['/social']);
      }).catch (err => console.log(err.message));
  }


  ///
 
  ngOnInit() {
  }

}

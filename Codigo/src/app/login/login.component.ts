import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  // errorMessage: string = '';
  public email: string;
  public password: string;
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public flashMensaje: FlashMessagesService
  ) {
    // this.createForm();
  }
  onSubmitLogin() {
    this.authService.dologin(this.email, this.password)
      .then((res) => {
        this.flashMensaje.show('Usuario logado correctamente.',
          { cssClass: 'alert-success', timeout: 4000 });
        this.router.navigate(['/social']);
      }).catch((err) => {
        this.flashMensaje.show(err.message,
          { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['/login']);
      });
  }

  onClickGoogleLogin() {
<<<<<<< HEAD
   this.authService.doGoogleLogin()
    .then((res) => {
        this.router.navigate(['/form-person']);
    }).catch( err => console.log(err.message));
=======
    this.authService.doGoogleLogin()
      .then((res) => {
        this.router.navigate(['/social']);
      }).catch(err => console.log(err.message));
>>>>>>> cesar
  }

  onClickFacebookLogin() {
    this.authService.doFacebookLogin()
      .then((res) => {
<<<<<<< HEAD
          this.router.navigate(['/form-person']);
      }).catch( err => console.log(err.message));
=======
        this.router.navigate(['/social']);
      }).catch(err => console.log(err.message));
>>>>>>> cesar
  }

  onClickTwitterLogin() {
    this.authService.doTwitterLogin()
      .then((res) => {
<<<<<<< HEAD
        this.router.navigate(['/form-person']);
      }).catch (err => console.log(err.message));
=======
        this.router.navigate(['/social']);
      }).catch(err => console.log(err.message));
>>>>>>> cesar
  }


  ///

  ngOnInit() {
  }

}

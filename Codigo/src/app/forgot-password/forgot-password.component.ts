import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public flashMensaje: FlashMessagesService,
    public app: AppComponent
  ) { }

  ngOnInit() {
  }
  onSubmitPassword() {
    this.authService.doRecovery(this.email)
      .then(() => {
        this.flashMensaje.show('Contraseña Enviada a ' + this.email,
          { cssClass: 'alert-success', timeout: 4000 });
        this.authService.doLogout();
        this.router.navigate(['/login']);
      }).catch((err) => {
        this.flashMensaje.show(err,
          { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['/login']);
      });
  }
}

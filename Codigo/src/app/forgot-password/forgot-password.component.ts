import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string;
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public flashMensaje: FlashMessagesService
  ) { }

  ngOnInit() {
  }
  onSubmitPassword() {
    this.authService.doRecovery(this.email)
    .then( () => {
      this.flashMensaje.show('Contraseña Enviada a ' + this.email,
      {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/social']);
    }).catch((err) => {
      this.flashMensaje.show(err,
      {cssClass: 'alert-danger', timeout: 4000});
      this.router.navigate(['/login']);
    });
  }
}

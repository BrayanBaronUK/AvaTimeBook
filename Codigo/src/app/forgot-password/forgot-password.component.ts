import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';

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
    public flashMensaje: FlashMessagesService,
    public app: AppComponent,
    public narbar: NavbarComponent
  ) { }

  ngOnInit() {
  }
  onSubmitPassword() {
    this.authService.doRecovery(this.email)
      .then(() => {
        this.flashMensaje.show('Contraseña Enviada a ' + this.email,
          { cssClass: 'alert-success', timeout: 4000 });
        this.app.Resetear();
        this.authService.doLogout();
        this.narbar.onSalirRecuperar();
        this.router.navigate(['/login']);
      }).catch((err) => {
        this.flashMensaje.show(err,
          { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['/login']);
      });
  }
  MostarInformacion() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.app.Obtener();
    document.getElementById('contraseña').style.display = 'none';
    document.getElementById('navbarColor02').style.display = 'flex';
    document.getElementById('container').style.display = 'block';
}
}

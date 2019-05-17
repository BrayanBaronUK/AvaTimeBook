import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Core/auth.service';
import { UserService } from '../Core/user.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  // public herramientas: boolean;
  public email: any;
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;
  private fotico: string;
  public userFirebase: any;

  constructor(
    private authService: AuthService,
    private UserServices: UserService,
    public app: AppComponent,
    private router: Router,
    public flashMensaje: FlashMessagesService,
  ) {
    this.userFirebase = {
      nombre: '',
      apellido: '',
      genero: '',
      edad: '',
      url: '',
      celular: '',
      nacionalidad: '',
      text: ''
    };
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreUsuario = auth.displayName;
        this.emailUsuario = auth.email;
        this.fotoUsuario = auth.photoURL;
        this.UserServices.getPerfil().valueChanges().subscribe((user) => {
          console.log(this.userFirebase = user);
          if (auth.displayName == null) {
            this.nombreUsuario = this.userFirebase.nombre;
          }
        });
      } else {
        this.isLogin = false;
        //  this.fotoUsuario='https://angellomix.com/wp-content/uploads/2016/10/login.png';
      }
    }
    );
    this.MostrarInformacion();
  }
  onClickLogout() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }
  MostrarInformacion() {
    jQuery(document).on('click', '.personas', function () {
      document.getElementById('perfil').style.display = 'none';
      document.getElementById('TablaFiltroPersonas').style.display = 'block';
    });
  }
  MostarInformacion() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.app.Obtener();
    document.getElementById('contraseña').style.display = 'block';
  document.getElementById('navbarColor02').style.display = 'none';
  }
  
  SalirRecuperar() {
  return document.getElementById('contraseña').style.display = 'none';
  }
  
  MostarInformacions() {
    // tslint:disable-next-line:no-debugger

    document.getElementById('contraseña').style.display = 'none';
    this.app.Resetear();
    document.getElementById('navbarColor02').style.display = 'block';
    this.router.navigate(['/social']);
}

onSubmitPassword() {
  // tslint:disable-next-line:no-debugger
  debugger;
  this.authService.doRecovery(this.email)
    .then(() => {
      this.flashMensaje.show('Contraseña Enviada a ' + this.email,
        { cssClass: 'alert-success', timeout: 4000 });
      this.authService.doLogout();
      document.getElementById('contraseña').style.display = 'none';
      this.app.Resetear();
      this.router.navigate(['/login']);
    }).catch((err) => {
      this.flashMensaje.show(err,
        { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['/login']);
    });
}
}

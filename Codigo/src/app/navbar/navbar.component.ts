import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Core/auth.service';
import { UserService } from '../Core/user.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 // public herramientas: boolean;
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;
  private fotico: string;
  public userFirebase: any;

  constructor(
    public authService: AuthService,
    public UserServices: UserService,
    public app: AppComponent,
    private router: Router
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
    this.fotico = 'https://angellomix.com/wp-content/uploads/2016/10/login.png';
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
        });
        if (this.fotoUsuario == null) {

          this.fotoUsuario = 'https://angellomix.com/wp-content/uploads/2016/10/login.png';
        }
      } else {
           this.isLogin = false;
           //  this.fotoUsuario='https://angellomix.com/wp-content/uploads/2016/10/login.png';
        }
      }
    );
  }
  onClickLogout() {
    this.authService.doLogout();
    this.router.navigate(['/login']);
  }
  MostarInformacion() {
      // tslint:disable-next-line:no-debugger
      debugger;
      this.app.Obtener();
      document.getElementById('contraseña').style.display = 'block';
  }
}

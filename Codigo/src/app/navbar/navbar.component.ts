import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogin: boolean;
  public nombreUsuario: string;
  public emailUsuario: string;
  public fotoUsuario: string;
  private fotico: string;
  constructor(
    public authService: AuthService

  ) {

    this.fotico = 'https://angellomix.com/wp-content/uploads/2016/10/login.png';
  }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreUsuario = auth.displayName;
        this.emailUsuario = auth.email;
        this.fotoUsuario = auth.photoURL;
      } else {
        this.isLogin = false;
      //  this.fotoUsuario='https://angellomix.com/wp-content/uploads/2016/10/login.png';
        
      }
    }
    );
  }
  onClickLogout() {
    this.authService.doLogout();
  }

}

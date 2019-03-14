import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';
import { ServicioLibroService } from '../core/servicio-libro.service';
@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css']
})
export class SocialPageComponent implements OnInit {

  userFirebase
  public libros = [];
  constructor(
    public UserServices: UserService,
    public Userlibro: ServicioLibroService
    ) {
  }

  ngOnInit() {
    this.userFirebase = {
      nombre: "",
      apellido: "",
      genero: "",
      edad: "",
      url: "",
      celular: "",
      nacionalidad: "",
      text: ""
    }
    
    this.UserServices.getPerfil().valueChanges().subscribe((user) => {
      console.log(this.userFirebase = user)
    });
    console.log(this.userFirebase)

    // trae una informacion de libros
      this.Userlibro.getLibro().subscribe((catsSnapshot) => {
        this.libros = [];
        catsSnapshot.forEach((catData: any) => {
          this.libros.push({
            id: catData.payload.doc.id,
            data: catData.payload.doc.data()
          });
        })
      });
  }

}

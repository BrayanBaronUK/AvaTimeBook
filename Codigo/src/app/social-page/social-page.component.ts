import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';
import { ServicioLibroService } from '../core/servicio-libro.service';
import { ServicioComentarioService } from '../Core/servicio-comentario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css']
})
export class SocialPageComponent implements OnInit {

  userFirebase
  public libros = [];
  public currentStatus = 1;
  public userComentario = [];
  constructor(
    public UserServices: UserService,
    public Userlibro: ServicioLibroService,
    public UserComentario: ServicioComentarioService
  ) {
   
    this.newcomentarioForm.setValue({
      text: ''

    });
  }
  //crea comentario
  public newcomentarioForm = new FormGroup({
    text: new FormControl('')
  })

  ngOnInit() {
    //trae informacion de usuario
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

    // trae una informacion de libros
    this.Userlibro.getLibro().subscribe((catsSnapshot) => {
      this.libros = [];
      catsSnapshot.forEach((catData: any) => {
        this.libros.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      });
    });

    //trae todos los comentarios
    this.UserComentario.getComentario().subscribe((comentario)=> {
      this.userComentario = [];
      comentario.forEach((comentariodata: any) =>{
        this.userComentario.push({
          id: comentariodata.payload.doc.id,
          data: comentariodata.payload.doc.data()
        });
      });
    });
  }
  // envia datos del comentario
  public newComentario(form) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        text: form.text
      }
      this.UserComentario.createComentario(data).then(() => {
        this.newcomentarioForm.setValue({
          text: ''
        });
      }, (error) => {
        console.error(error);
      });
    }
  }

}

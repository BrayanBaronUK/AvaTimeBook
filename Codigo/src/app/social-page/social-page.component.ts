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

  userFirebase: any;
  public libros = [];
  public currentStatus = 1;
  public userComentario = [];
  public input: any;
  public date14: Date;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  constructor(
    public UserServices: UserService,
    public Userlibro: ServicioLibroService,
    public UserComentario: ServicioComentarioService
  ) {
    // crea comentario
    this.newcomentarioForm.setValue({
      text: ''

    });
  }
  // envia formulario a funcion
  public newcomentarioForm = new FormGroup({
    text: new FormControl('')
  });

  ngOnInit() {
    // trae informacion de usuario
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

    this.UserServices.getPerfil().valueChanges().subscribe((user) => {
      console.log(this.userFirebase = user);
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

    // trae todos los comentarios
    this.UserComentario.getComentario().subscribe((comentario) => {
      this.userComentario = [];
      comentario.forEach((comentariodata: any) => {
        this.userComentario.push({
          id: comentariodata.payload.doc.id,
          data: comentariodata.payload.doc.data()
        });
      });
    });

    this.myFunction();
  }
  // envia datos del comentario
  public newComentario(form) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const data = {
        text: form.text,
        date: this.UserComentario.getTimeStamp()
      };
      this.UserComentario.createComentario(data).then(() => {
        this.newcomentarioForm.setValue({
          text: ''
        });
      }, (error) => {
        console.error(error);
      });
    }
  }

    // FUNCIONES DE ELMININACION

    EliminarComentario(id) {
      this.UserComentario.deleteComentario(id);
    }

    myFunction() {
      // tslint:disable-next-line:no-debugger
      debugger;
      this.input = document.getElementById('input');
      if ( this.input.value === '') {
          this.OcultarTablero();
      } else {
      this.filter = this.input.value.toUpperCase();
      console.log(this.filter);
      this.table = document.getElementById('myTable');
      console.log(this.table);
      this.tr = this.table.getElementsByTagName('tr');
      console.log(this.tr);
      for (this.i = 0; this.i < this.tr.length; this.i++) {
        this.td = this.tr[this.i].getElementsByTagName('td')[0];
        console.log(this.td);
        if (this.td) {
          this.txtValue = this.td.textContent || this.td.innerText;
          console.log(this.td);
          if (this.txtValue.toUpperCase().indexOf(this.filter) > -1) {
            console.log(this.filter);
            this.tr[this.i].style.display = '';
            console.log(this.tr);
          } else {
            this.tr[this.i].style.display = 'none';
            console.log(this.tr);
          }
        }
      }
      }

    }

    MostrarInformacion() {
      jQuery(document).on('click', '.filtro', function () {
        document.getElementById('filtro').style.display = 'block';
        document.getElementById('social').style.display = 'none';
        document.getElementById('myInput').style.display = 'none';
      });
    }
    OcultarTablero() {
        document.getElementById('filtro').style.display = 'none';
        document.getElementById('social').style.display = 'block';
    }
}

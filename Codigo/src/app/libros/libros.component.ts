import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { UserService } from '../Core/user.service';
import { Libros } from '../variables/libros';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  public filtrouser = [];
  public userLibro: any;
  public colum: any[];
  public input: any;
  public InformacionLibrosProvicional: any;
  public CrearLibrosProvicional: any;
  private id: any;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  constructor(
    public userservicioperfil: UserService,
    public UserLibro: ServicioLibroService,
    public flashMensaje: FlashMessagesService,
    public router: Router
  ) {


  }

  ngOnInit() {
    this.Variables();
    this.EditarLibros();
    this.CrearLibros();
    this.TraerLibrosFiltro();
    this.TraerLibro();
    this.MostrarColumnas();
  }

  // iniciar variables


  MostrarColumnas() {
    this.colum = [
      { header: 'Nombre' },
      { header: 'Autor' },
      { header: 'Categoria' },
      { header: 'Descripcion' }
    ];
  }
  Variables() {
    this.userLibro = {
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
      text_libro: ''
    };
  }
  CrearLibros() {
    this.CrearLibrosProvicional = {
      id: '',
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
      text_libro: ''
    };
  }
  TraerLibrosFiltro() {
    // trae todos los comentarios
    this.UserLibro.getLibro().subscribe((usuarios) => {
      this.filtrouser = [];
      usuarios.forEach((usuariosdata: any) => {
        this.filtrouser.push({
          id: usuariosdata.payload.doc.id,
          data: usuariosdata.payload.doc.data()
        });
      });
    });
  }

  myFunction() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.input = document.getElementById('myInput');
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


  TraerLibro() {
    // trae todos los libros
    this.UserLibro.getLibro().subscribe((libros) => {
      this.userLibro = [];
      libros.forEach((librodata: any) => {
        this.userLibro.push({
          id: librodata.payload.doc.id,
          data: librodata.payload.doc.data()
        });
      });
    });
  }

  onCancelar() {
    this.CrearLibrosProvicional = {
      id: '',
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
      text_libro: ''
    };
    this.cerrar.emit();
  }
  // crear libro por medio de perfil
  onGuardarlibrocreado() {
    this.UserLibro.createLibro(this.CrearLibrosProvicional);
    this.CrearLibrosProvicional = {
      id: '',
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
      text_libro: ''
    };
    this.flashMensaje.show('Libro creado.',
      { cssClass: 'alert-success', timeout: 4000 });
    this.onCancelar();
  }
  // editar libros
  EditarLibros() {
    this.InformacionLibrosProvicional = {
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
      text_libro: ''
    };
  }

  EliminarLibro(id) {
    this.UserLibro.deleteLibro(id);
  }
  // se trae la informacion para editar
  onLibro(libro, id) {
    this.id = id;
    this.InformacionLibrosProvicional = libro;
  }
  // guardar los libros editados
  onGuardareditarlibro() {
    this.UserLibro.updateLibro(this.id, this.InformacionLibrosProvicional);
    this.onCancelar();
  }
}

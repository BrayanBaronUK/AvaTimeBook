import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { UserService } from '../Core/user.service';
import { Libros } from '../variables/libros';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputText, SelectItem } from 'primeng/primeng';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrosComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  public filtrouser = [];
  public userLibro = [];
  public colum: any[];
  public input: any;
  public InformacionLibrosProvicional: any;
  public CrearLibrosProvicional: any;
  private id: any;
  public currentStatus = 1;
  // tslint:disable-next-line:no-inferrable-types
  public display: boolean = false;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  public categoria: SelectItem[];

  constructor(
    public userservicioperfil: UserService,
    public UserLibro: ServicioLibroService,
    public flashMensaje: FlashMessagesService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this.Variables();
    this.EditarLibros();
    this.TraerLibrosFiltro();
    this.TraerLibro();
    this.MostrarColumnas();
    document.getElementById('siguiente').style.display = 'none';
  }

  // iniciar variables

  detectChanges() {
    this.cd.detectChanges();
  }

  MostrarColumnas() {
    this.colum = [
      { field: 'nombre_libro', header: 'Nombre Libro' },
      { field: 'autor_libro', header: 'Autor Libro' },
      { field: 'categoria_libro', header: 'Categoria' },
    ];

    this.categoria = [
      {label: 'Todo', value: 'null'},
      {label: 'Investigacion', value: 'Investigacion'}
    ];
  }
  showDialog() {
    this.display = true;
  }
  Variables() {
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




  TraerLibro() {
    // trae todos los libros
    this.UserLibro.getLibro().subscribe((libros) => {
      libros.map((librodata: any) => {
        this.userLibro.push({
              id: librodata.payload.doc.id,
              nombre_libro: librodata.payload.doc.data().nombre_libro,
              autor_libro: librodata.payload.doc.data().autor_libro,
              categoria_libro: librodata.payload.doc.data().categoria_libro
        });
      });
    });
    console.log(this.userLibro);
  }

  onCancelar() {
    document.getElementById('contenedor').style.visibility = 'visible';
    this.router.navigate(['/libros']);
    this.display = false;
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
    // tslint:disable-next-line:no-debugger
    debugger;
    this.showDialog();
    document.getElementById('contenedor').style.visibility = 'hidden';
    this.id = id;
    this.InformacionLibrosProvicional = libro;
    libro = null;
  }
  // guardar los libros editados
  onGuardareditarlibro() {
    this.UserLibro.updateLibro(this.id, this.InformacionLibrosProvicional);
    this.onCancelar();
  }
  onFiltro(id) {
    console.log(id);
  }
}

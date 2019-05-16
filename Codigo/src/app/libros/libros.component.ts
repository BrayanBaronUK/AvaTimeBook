import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { UserService } from '../Core/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
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
      this.userLibro = [];
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

  // crear libro por medio de perfil

  // editar libros

  onFiltro(id) {
    console.log(id);
  }
}

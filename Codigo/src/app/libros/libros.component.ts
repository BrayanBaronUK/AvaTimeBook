import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { UserService } from '../Core/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import {PerfilOtroComponent} from '../perfil-otro/perfil-otro.component';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  @ViewChild('child1') childOne:PerfilOtroComponent;
  public filtrouser = [];
  public userLibro = [];
  public colum: any[];
  public input: any;
  public InformacionLibrosProvicional: any;
  public CrearLibrosProvicional: any;
  private id: any;
  public perfil = false;
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
    this.MostrarOcultar();
    document.getElementById('siguiente').style.display = 'none';
  }

  change(id):void{
    this.childOne.empezaCargarPerfilDondeLibro(id); 
    this.MostrarInformacion(); 
    this.perfil = true;
   }
   MostrarInformacion() {
      document.getElementById('perfil').style.display = 'block';
      document.getElementById('librosOcultar').style.display = 'none';
  }
  MostrarOcultar() {
      document.getElementById('perfil').style.display = 'none';
      document.getElementById('librosOcultar').style.display = 'block';
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
    debugger;
    this.UserLibro.ObtenerLibroGlobal().subscribe((libros) => {
      this.userLibro = [];
      debugger;
      libros.map((librodata: any) => {
        this.userLibro.push({
              id: librodata.payload.doc.id,
              nombre_libro: librodata.payload.doc.data().nombre_libro,
              autor_libro: librodata.payload.doc.data().autor_libro,
              categoria_libro: librodata.payload.doc.data().categoria_libro,
              uid: librodata.payload.doc.data().id
        });
      });
    });
    console.log(this.userLibro);
  }

  // crear libro por medio de perfil

  // editar libros
}

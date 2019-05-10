import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { UserService } from '../Core/user.service';
import { Libros } from '../variables/libros';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {InputText} from 'primeng/primeng'
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public currentStatus = 1;
  // tslint:disable-next-line:no-inferrable-types
  public display: boolean = false;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;


  cars = [
    {"vin":"a1653d4d","brand":"VW","year":1998,"color":"White","price":10000},
    {"vin":"ddeb9b10","brand":"Mercedes","year":1985,"color":"Green","price":25000},
    {"vin":"d8ebe413","brand":"Jaguar","year":1979,"color":"Silver","price":30000},
    {"vin":"aab227b7","brand":"Audi","year":1970,"color":"Black","price":12000},
    {"vin":"631f7412","brand":"Volvo","year":1992,"color":"Red","price":15500},
    {"vin":"7d2d22b0","brand":"VW","year":1993,"color":"Maroon","price":40000},
    {"vin":"50e900ca","brand":"Fiat","year":1964,"color":"Blue","price":25000},
    {"vin":"4bbcd603","brand":"Renault","year":1983,"color":"Maroon","price":22000},
    {"vin":"70214c7e","brand":"Renault","year":1961,"color":"Black","price":19000},
    {"vin":"ec229a92","brand":"Audi","year":1984,"color":"Brown","price":36000},
    {"vin":"1083ee40","brand":"VW","year":1984,"color":"Silver","price":215000},
  ]
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
      { field: 'vin', header: 'Vin' },
      { field: 'year', header: 'Year' },
      { field: 'brand', header: 'Brand' },
      { field: 'color', header: 'Color' }
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
      libros.map((librodata: any) => {
        this.userLibro.push({
          id: librodata.payload.doc.id,
          data: librodata.payload.doc.data()
        });
      });
    });
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

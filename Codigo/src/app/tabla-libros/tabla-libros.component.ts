import { Component, OnInit, Output, EventEmitter, } from '@angular/core';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { UserService } from '../Core/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabla-libros',
  templateUrl: './tabla-libros.component.html',
  styleUrls: ['./tabla-libros.component.css']
})
export class TablaLibrosComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  public userLibro = [];
  public colum: any[];
  public InformacionLibrosProvicional: any;
  public CrearLibrosProvicional: any;
  public display: boolean = false;
  private id: any;
  constructor(
    public userservicioperfil: UserService,
    public UserLibro: ServicioLibroService,
    public flashMensaje: FlashMessagesService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.EditarLibros();
    this.TraerLibro();
    this.MostrarColumnas();
  }

  // iniciar variables

  MostrarColumnas() {
    this.colum = [
      { field: 'nombre_libro', header: 'Nombre Libro' },
      { field: 'autor_libro', header: 'Autor Libro' },
      { field: 'categoria_libro', header: 'Categoria' },
    ];
  }
  showDialog() {
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

  }
  // editar libros
  EditarLibros() {
    this.InformacionLibrosProvicional = {
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
    };
  }

  EliminarLibro(id) {
    this.UserLibro.deleteLibro(id);
  }
  onLibro(libro, id) {
    debugger;
    document.getElementById('vistaTabla').style.visibility = 'hidden';
    this.display = true;
    this.id = id;
    this.InformacionLibrosProvicional = libro;
  }
  onGuardareditarlibro() {
    this.UserLibro.updateLibro(this.id, this.InformacionLibrosProvicional);
    this.onCancelar();
  }
  onCancelar() {
    this.router.navigate(['/libros']);
    document.getElementById('vistaTabla').style.visibility = 'visible';
    this.display = false;
    this.cerrar.emit();
    
  }
}

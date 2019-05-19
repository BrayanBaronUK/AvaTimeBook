import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../Core/user.service';
import { Observable } from 'rxjs';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { ServicioComentarioService } from '../Core/servicio-comentario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle, SafeHtml } from '@angular/platform-browser';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-perfil-otro',
  templateUrl: './perfil-otro.component.html',
  styleUrls: ['./perfil-otro.component.css']
})
export class PerfilOtroComponent implements OnInit {

  public idLlego;
  @Output() cerrar = new EventEmitter();
  @ViewChild('imageUser') inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public userFirebase: any;
  public canSeguidor: any;
  public canSeguir: any;
  public userComentario = [];
  public userLibro = [];
  public item = 1;
  public currentStatus = 1;
  public InformacionUsuarioProvicional: any;
  public foto: any;
  public count = 0;
  public idtema;
  public temporalDatos = [];
  public id;
  public siguiendo = [];
  public nombre: String;
  public dataSeg: any;
  public userLocal: any;
  public intereso = 'Se intereso por un libro';
  displaySeguir: boolean = false;
  displayNoSeguir: boolean = false;
  public date14: Date;
  text: String;
  images: any[];
  // tslint:disable-next-line:no-inferrable-types
  public display: boolean = false;
  public usuarioEdit: any;
  constructor(
    public UserServices: UserService,
    private storage: AngularFireStorage,
    private _storage: AngularFireStorage,
    public UserComentario: ServicioComentarioService,
    private _sanitizer: DomSanitizer,
    public flashMensaje: FlashMessagesService,
    public router: Router,
    public fb: FormBuilder,
    public UserLibro: ServicioLibroService
  ) {
    // crea comentario;
    this.newcomentarioForm.setValue({
      ids: '',
      text: ''
    });
  }
  // crea comentario
  public newcomentarioForm = new FormGroup({
    text: new FormControl(null, Validators.required),
    ids: new FormControl()
  });
  ngOnInit() {
    this.obtenerCantidadSeguidores();
    this.obtenerCantidadSiguiendo();
  }
  TraerComentario() {
    // trae todos los comentarios
    this.UserComentario.getComentarioOtroPerfil(this.idLlego).subscribe((comentario) => {
      this.userComentario = [];
      comentario.forEach((comentariodata: any) => {
        this.userComentario.push({
          id: comentariodata.payload.doc.id,
          data: comentariodata.payload.doc.data()
        });
      });
    });
  }

  TraerInformacionUsuario(idLlego) {
    this.TraerLibro();
    this.TraerComentario();
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
    if (idLlego == null) {
      this.UserServices.getPerfil().valueChanges().subscribe((user) => {
        this.userFirebase = user;
        this.dataSeg = user;
      });
    } else {
      this.UserServices.getPerfilOtro(this.idLlego).valueChanges().subscribe((user) => {
        this.userFirebase = user;
      });
    }

  }
  empezaCargarPerfil(id, s, data) {
    this.idtema = s;
    this.idLlego = id;
    this.dataSeg = data
    console.log("empezar" + s)
    this.TraerInformacionUsuario(this.idLlego);
  }
  empezaCargarPerfilDondeLibro(id) {
    this.UserServices.getCantidadSiguiendo().subscribe(sig => {
      this.siguiendo = [];
      sig.map(m => {
        this.siguiendo.push({
          id: m.payload.doc.id
        })
      });
      for (var i = 0; i < this.siguiendo.length; i++) {
        if (id == this.siguiendo[i].length) {
          this.idtema = 'Siguiendo';
        }
      }
      if (this.idtema == null) {
        this.idtema = 'Seguir';
      }
    })
    this.idLlego = id;
    this.TraerInformacionUsuario(this.idLlego);
  }
  showDialog() {
    this.display = true;
  }
  TraerLibro() {
    // trae todos los libros
    this.UserLibro.getLibros(this.idLlego).subscribe((libros) => {
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
  onFuction() {
    if (this.idtema == 'Seguir') {
      this.onfiltroSeguir(this.dataSeg, this.idLlego);
    } else if (this.idtema == 'Siguiendo') {
      this.onfiltroNoSeguir(this.dataSeg, this.idLlego);
    }
  }

  onfiltroSeguir(data, id) {
    debugger;
    this.temporalDatos = data;
    this.id = id;
    this.displaySeguir = true;
    this.nombre = data.nombre;
  }
  onfiltroNoSeguir(data, id) {
    debugger;
    this.temporalDatos = data;
    this.id = id;
    this.displayNoSeguir = true;
    this.nombre = data.nombre;
  }
  crearSeguir() {
    this.UserServices.GuardarPersonaSeguir(this.id, this.temporalDatos);
    this.UserServices.getPerfil().valueChanges().subscribe((user) => {
      this.UserServices.GuadarPersonaSeguidor(this.id, user);
      this.idtema = 'Siguiendo'
      this.flashMensaje.show('Informacion Aceptada.',
        { cssClass: 'alert-success', timeout: 2500 });
    });
    this.onCancelar();
  }
  noSeguir() {
    this.UserServices.QuitarPersonaSeguir(this.id);
    this.UserServices.QuitarPersonaSeguidor(this.id);
    this.idtema = 'Seguir'
    this.flashMensaje.show('Informacion Aceptada.',
      { cssClass: 'alert-success', timeout: 2500 });
    this.onCancelar();
  }
  onCancelar() {
    this.cerrar.emit();
    this.displaySeguir = false;
    this.displayNoSeguir = false;
  }
  Intercambio() {
    if (this.idtema == 'Seguir') {
      this.flashMensaje.show('Debe Seguir a ' + this.userFirebase.nombre,
        { cssClass: 'alert-success', timeout: 2500 });
    } else if (this.idtema == 'Siguiendo') {
      this.comunicacion(), this.flashMensaje.show('Informacion Enviada',
        { cssClass: 'alert-success', timeout: 2500 });
    }
  }

  obtenerCantidadSeguidores(){
    this.UserServices.getCantidadSeguidores().subscribe( seguidor => {
      this.canSeguidor = [];
      debugger;
      seguidor.map( s =>{
        this.canSeguidor.push({
          id: s.payload.doc.id
        });
      });
    });
  }
  obtenerCantidadSiguiendo(){
    this.UserServices.getCantidadSiguiendo().subscribe( seguidor => {
      this.canSeguir = [];
      debugger;
      seguidor.map( s =>{
        this.canSeguir.push({
          id: s.payload.doc.id
        });
      });
    });
  }


  comunicacion() {
    this.userLocal = {
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
      this.userLocal= user;
      this.UserServices.CrearComunicaciones(this.idLlego,this.userLocal,this.intereso);

    });
}
}
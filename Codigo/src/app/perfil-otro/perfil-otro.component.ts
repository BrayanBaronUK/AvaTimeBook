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

  @Input('parentData') public idLlego;
  @Output() cerrar = new EventEmitter();
  @ViewChild('imageUser') inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public userFirebase: any;
  public userComentario = [];
  public userLibro = [];
  public item = 1;
  public currentStatus = 1;
  private id: any;
  public InformacionUsuarioProvicional: any;
  public foto: any;
  public count = 0;
  public date14: Date;
  public idnuevo;
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

    this.text = `This will be converted to EmojiOne emojis! :thumbsup: ❤️`;
  }
  // crea comentario
  public newcomentarioForm = new FormGroup({
    text: new FormControl(null, Validators.required),
    ids: new FormControl()
  });

  ngOnInit() {
    this.TraerComentario();
    this.TraerInformacionUsuario(this.idLlego);
    //  this.MostrarInformacion();
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
    console.log("traer" + idLlego)
    if (idLlego == null) {
      this.UserServices.getPerfil().valueChanges().subscribe((user) => {
        this.userFirebase = user;
      });
    } else {
      this.UserServices.getPerfilOtro(this.idLlego).valueChanges().subscribe((user) => {
        this.userFirebase = user;
      });
    }

  }

  empezaCargarPerfil(id) {
    this.idLlego = id;
    console.log("empezar" + this.idLlego)
    this.TraerInformacionUsuario(this.idLlego);
  }



  // resive la informacion a editar
  onUsuario(usuario) {
    this.InformacionUsuarioProvicional = {
      nombre: '',
      apellido: '',
      edad: '',
      url: '',
      celular: '',
      text: ''
    };
    this.showDialog();
    this.InformacionUsuarioProvicional = usuario;
    usuario = null;
    this.usuarioEdit = usuario;
  }

  // actualizar informacion usuario




  // cancelar funcion usuario
  onCancelarUsuario() {
    this.InformacionUsuarioProvicional = null;
    this.display = false;
    this.cerrar.emit();
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



  // FUNCIONES DE ELMININACION

}

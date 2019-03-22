import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { ServicioLibroService} from '../core/servicio-libro.service';
import { ServicioComentarioService } from '../Core/servicio-comentario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle, SafeHtml } from '@angular/platform-browser';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  private foto: string;
  public userFirebase: any;
  public userComentario = [];
  public userLibro = [];
  public item = 1;
  constructor(
    public UserServices: UserService,
    private _storage: AngularFireStorage,
    public UserComentario: ServicioComentarioService,
    private _sanitizer: DomSanitizer,
    public flashMensaje: FlashMessagesService,
    public router: Router,
    public UserLibro: ServicioLibroService
  ) {
    // crea comentario;
    this.newcomentarioForm.setValue({
      text: ''

    });
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
  }
  // crea comentario
  public newcomentarioForm = new FormGroup({
    text: new FormControl('')
  });
  ngOnInit() {
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
    console.log(this.userFirebase);

    // trae todos los libros
    this.UserLibro.getLibro().subscribe((libro) => {
      this.userLibro = [];
       libro.forEach((librodata: any) => {
        this.userLibro.push({
          id: librodata.payload.doc.id,
          data: librodata.payload.doc.data()
        });
      });
    });
    console.log(this.userFirebase);
  }
  // imagenes
  sanitizeImg(url: any): SafeUrl {
    return this._sanitizer.bypassSecurityTrustUrl(url);
  }
  // funcion perfil
  MostrarInformacion() {
    jQuery(document).on('click', '.informacion', function () {
      document.getElementById('informacion').style.display = 'block';
      document.getElementById('publicaciones').style.display = 'none';
      document.getElementById('libros').style.display = 'none';
      document.getElementById('seguidores').style.display = 'none';
      document.getElementById('editarLibros').style.display = 'none';

    });
    jQuery(document).on('click', '.publicaciones', function () {
      document.getElementById('informacion').style.display = 'none';
      document.getElementById('publicaciones').style.display = 'block';
      document.getElementById('libros').style.display = 'none';
      document.getElementById('seguidores').style.display = 'none';
      document.getElementById('editarLibros').style.display = 'none';

    });
    jQuery(document).on('click', '.libros', function () {
      document.getElementById('informacion').style.display = 'none';
      document.getElementById('publicaciones').style.display = 'none';
      document.getElementById('libros').style.display = 'block';
      document.getElementById('seguidores').style.display = 'none';
      document.getElementById('editarLibros').style.display = 'none';

    });
    jQuery(document).on('click', '.seguidores', function () {
      document.getElementById('informacion').style.display = 'none';
      document.getElementById('publicaciones').style.display = 'none';
      document.getElementById('libros').style.display = 'none';
      document.getElementById('seguidores').style.display = 'block';
      document.getElementById('editarLibros').style.display = 'none';

    });
    jQuery(document).on('click', '.editarLibros', function () {
      document.getElementById('informacion').style.display = 'none';
      document.getElementById('publicaciones').style.display = 'none';
      document.getElementById('libros').style.display = 'none';
      document.getElementById('seguidores').style.display = 'none';
      document.getElementById('editarLibros').style.display = 'block';
    });
  }
 /* Obtenerinformacion() {
    const nombreEnviar = $(document.getElementById('nombre'));
      this.UserServices.updatePerfil({
      nombre: nombreEnviar,
      apellido: '',
      genero: '',
      edad: '',
      url: '',
      celular: '',
      nacionalidad: '',
      text: ''
    });
  }*/
  // Subir foto
  upload(event) {
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    const filepath = `/${randomId}`;

    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      (() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
  }
  // envia datos del comentario
  public newComentario(form) {
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

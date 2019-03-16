import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { ServicioComentarioService } from '../Core/servicio-comentario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  private foto: string;
  userFirebase: any;
  public userComentario = [];
  public currentStatus = 1;
  constructor(
    public UserServices: UserService,
    private _storage: AngularFireStorage,
    public UserComentario: ServicioComentarioService,
    private _sanitizer: DomSanitizer
  ) {
    // this.foto = this.userFirebase.nombre;

    // crea comentario;
    this.newcomentarioForm.setValue({
      text: ''

    });
  }
  // crea comentario
  public newcomentarioForm = new FormGroup({
    text: new FormControl('')
  });
  ngOnInit() {
    // trae la informacion de usuario
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
  }
  sanitizeImg(url: any): SafeUrl {
    return this._sanitizer.bypassSecurityTrustUrl(url);
 }
  MostrarInformacion() {
    jQuery(document).on('click', '.informacion', function () {
      document.getElementById('informacion').style.display = 'block';
      document.getElementById('publicaciones').style.display = 'none';
      document.getElementById('libros').style.display = 'none';
      document.getElementById('seguidores').style.display = 'none';
    });
    jQuery(document).on('click', '.publicaciones', function () {
      document.getElementById('informacion').style.display = 'none';
      document.getElementById('publicaciones').style.display = 'block';
      document.getElementById('libros').style.display = 'none';
      document.getElementById('seguidores').style.display = 'none';
    });
    jQuery(document).on('click', '.libros', function () {
      document.getElementById('informacion').style.display = 'none';
      document.getElementById('publicaciones').style.display = 'none';
      document.getElementById('libros').style.display = 'block';
      document.getElementById('seguidores').style.display = 'none';
    });
    jQuery(document).on('click', '.seguidores', function () {
      document.getElementById('informacion').style.display = 'none';
      document.getElementById('publicaciones').style.display = 'none';
      document.getElementById('libros').style.display = 'none';
      document.getElementById('seguidores').style.display = 'block';
    });
  }

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
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const  data = {
        text: form.text
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

}

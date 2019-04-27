import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { UserService } from '../Core/user.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { ServicioComentarioService } from '../Core/servicio-comentario.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle, SafeHtml } from '@angular/platform-browser';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { debug } from 'util';
import { validateConfig } from '@angular/router/src/config';





@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})




export class PerfilComponent implements OnInit {



  @Output() cerrar = new EventEmitter();
  @ViewChild('imageUser') inputImageUser: ElementRef;
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public userFirebase: any;
  public userComentario = [];
  public item = 1;
  public currentStatus = 1;
  private id: any;
  public InformacionUsuarioProvicional: any;
  public count = 0;
  public date14: Date;
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
    ) {
    // crea comentario;
    this.newcomentarioForm.setValue({
      ids: '',
      text: ''
    });


    this.TraerInformacionUsuario();
  }
  // crea comentario
  public newcomentarioForm = new FormGroup({
    text: new FormControl(''),
    ids: new FormControl()
  });

  ngOnInit() {
    this.TraerComentario();
  //  this.MostrarInformacion();
  }



  TraerComentario() {
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

  TraerInformacionUsuario() {
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



  // resive la informacion a editar
  onUsuario(usuario) {
    this.InformacionUsuarioProvicional = {
      nombre: '',
      apellido: '',
      genero: '',
      edad: '',
      url: '',
      celular: '',
      nacionalidad: '',
      text: ''
    };
    this.showDialog();
    this.InformacionUsuarioProvicional = usuario;
    this.usuarioEdit = usuario;
  }

  // actualizar informacion usuario
  onGuardarUsuarioUpdate() {
    this.count = 1;
    this.InformacionUsuarioProvicional.url = this.inputImageUser.nativeElement.value;
    this.UserServices.updatePerfil(this.InformacionUsuarioProvicional);
    this.onCancelarUsuario();
  }



  // cancelar funcion usuario
  onCancelarUsuario() {
    this.InformacionUsuarioProvicional = null;
    this.display = false;
    this.cerrar.emit();
  }

  // envia datos del comentario
  public newComentario(form) {
    const data = {
      text: form.text,
      date: this.UserComentario.getTimeStamp()
    };
    this.UserComentario.createComentario(data).then(() => {
      this.newcomentarioForm.setValue({
        id: '',
        text: ''
      });
    }, (error) => {
      console.error(error);
    });
  }
  showDialog() {
    this.display = true;
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL()))
    .subscribe();
  }

  // FUNCIONES DE ELMININACION

  EliminarComentario(id) {
    this.UserComentario.deleteComentario(id);
  }

}

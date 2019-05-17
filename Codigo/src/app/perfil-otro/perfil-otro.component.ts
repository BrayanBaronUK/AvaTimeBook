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
    ) {
    // crea comentario;
    this.newcomentarioForm.setValue({
      ids: '',
      text: ''
    });

    this.text = `This will be converted to EmojiOne emojis! :thumbsup: ❤️`;
    this.TraerInformacionUsuario();
  }
  // crea comentario
  public newcomentarioForm = new FormGroup({
    text: new FormControl(null, Validators.required),
    ids: new FormControl()
  });

  ngOnInit() {
    this.TraerComentario();
    this.TraerInformacionUsuario();
    this.fotos();
    this.TraerInformacionUsuario2(this.idnuevo);
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
    if(this.idLlego == null){
      this.UserServices.getPerfil().valueChanges().subscribe((user) => {
        console.log(this.userFirebase = user);
      });
      console.log("soy llego"+this.idLlego);
    }else{
          this.UserServices.getPerfilOtro(this.idLlego).valueChanges().subscribe((user) => {
      console.log(this.userFirebase = user);
    });
    console.log("soy llego si llego"+this.idLlego);
    }

  }

  TraerInformacionUsuario2(id) {
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
    if(id == null){
      this.UserServices.getPerfil().valueChanges().subscribe((user) => {
        console.log(this.userFirebase = user);
      });
    }else{
          this.UserServices.getPerfilOtro(id).valueChanges().subscribe((user) => {
      console.log(this.userFirebase = user);
    });
    
    }
console.log("soy llego si llego"+id);
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
  onGuardarUsuarioUpdate() {
    this.count = 1;
    if (this.inputImageUser.nativeElement.value !== '' ) {
      this.InformacionUsuarioProvicional.url = this.inputImageUser.nativeElement.value;
      this.UserServices.updatePerfil(this.InformacionUsuarioProvicional);
    } else {
      this.UserServices.updatePerfil(this.InformacionUsuarioProvicional);
    }

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

  fotos() {
    this.foto = {
      url: ''
    };
    this.UserServices.getPerfil().valueChanges().subscribe((user) => {
      console.log(this.foto = user);
    });
    this.images = [];
    // tslint:disable-next-line:no-debugger
    debugger;
    this.images.push({source: this.foto.url});
  }

  // FUNCIONES DE ELMININACION

  EliminarComentario(id) {
    this.UserComentario.deleteComentario(id);
  }

}

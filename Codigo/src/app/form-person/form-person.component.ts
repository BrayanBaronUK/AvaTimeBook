import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../Core/auth.guard';
import { UserService } from '../Core/user.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {

  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;

  public perfiles = [];
  public currentStatus = 1;

  constructor(
    public authService: AuthGuard,
    private _storage: AngularFireStorage,
    public UserServices: UserService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) {
    this.newperfilForm.setValue({
      id: '',
      nombre: '',
      apellido: '',
      genero: '',
      edad: '',
      url: '',
      celular: '',
      nacionalidad: '',
      text: '',
      nombre_libro: '',
      autor_libro: '',
      text_libro: '',
      url_libro: ''

    });
  }
  public newperfilForm = new FormGroup({
    id: new FormControl(''),
    nombre: new FormControl(Validators.required, Validators.pattern('[a-zA-Z ]*')),
    apellido: new FormControl(Validators.required, Validators.pattern('[a-zA-Z ]*')),
    url: new FormControl(null),
    genero: new FormControl(Validators.required, Validators.required),
    edad: new FormControl(Validators.required, Validators.required),
    celular: new FormControl(Validators.required, Validators.required),
    nacionalidad: new FormControl(Validators.required, Validators.pattern('[a-zA-Z ]*')),
    text: new FormControl(''),
    nombre_libro: new FormControl(Validators.pattern('[a-zA-Z ]*')),
    autor_libro: new FormControl(Validators.pattern('[a-zA-Z ]*')),
    text_libro: new FormControl(Validators.pattern('[a-zA-Z ]*')),
    url_libro: new FormControl(null)
  })
  onSubmit() {
  }
  ngOnInit() {
    //se instacia y se obtiene la informacion completa de firebase
    this.UserServices.getPerfiles().subscribe((perfilesSnapshot) => {
      this.perfiles = [];
      perfilesSnapshot.forEach((perfilData: any) => {
        this.perfiles.push({
          id: perfilData.payload.doc.id,
          data: perfilData.payload.doc.data()
        });
      })
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


  onClickValidar() {
    this.authService.setParametro(2);
  }
<<<<<<< HEAD


  
  public newPerfil(form, documentId = this.documentId) {
=======
  public newPerfil(form) {
>>>>>>> b567d0f7015ce71ef6428702996ae20eaf338740
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        apellido: form.apellido,
        genero: form.genero,
        edad: form.edad,
        url: form.url,
        celular: form.celular,
        nacionalidad: form.nacionalidad,
        text: form.text,
        nombre_libro: form.nombre_libro,
        autor_libro: form.autor_libro,
        text_libro: form.text_libro,
        url_libro: form.url_libro
      }
      this.UserServices.createPefil(data).then(() => {
        this.newperfilForm.setValue({
          id: '',
          nombre: '',
          apellido: '',
          genero: '',
          edad: '',
          url: '',
          celular: '',
          nacionalidad: '',
          text: '',
          nombre_libro: '',
          autor_libro: '',
          text_libro: '',
          url_libro: ''
        });
<<<<<<< HEAD



    //    this.UserServices.createPefilview().subscribe(  resp =>{
      //    console.log('Documento creado exitósamente!', resp);})
        
        }, (error) => {
=======
        this.flashMensaje.show('Información Cargada correctamente.',
        {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/social']);
      }, (error) => {
>>>>>>> b567d0f7015ce71ef6428702996ae20eaf338740
        console.error(error);
      });
    } 
  }
}

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
  userFirebase

  constructor(
    public authService: AuthGuard,
    private _storage: AngularFireStorage,
    public UserServices: UserService,
    public router: Router,
    public flashMensaje: FlashMessagesService,
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
      text: ''

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
    text: new FormControl('')
  })
  onSubmit() {
  }
  ngOnInit() {
   
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
  public newPerfil(form) {
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
        text: form.text
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
          text: ''
        });
        this.flashMensaje.show('Información Cargada correctamente.',
        {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/crearlibro']);
      }, (error) => {
        console.error(error);
      });
    } 
  }
 

}

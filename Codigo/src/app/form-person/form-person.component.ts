import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../Core/auth.guard';
import { UserService } from '../Core/user.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {

  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  public currentStatus = 1;
  userFirebase: any;

  constructor(
    public authService: AuthGuard,
    private _storage: AngularFireStorage,
    public UserServices: UserService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) {
    this.newperfilForm.setValue({
      nombre: '',
      apellido: '',
      genero: '',
      edad: '',
      celular: '',
      nacionalidad: '',
      text: ''

    });
  }
  public newperfilForm = new FormGroup({
    nombre: new FormControl(Validators.required, Validators.pattern('[a-zA-Z ]*')),
    apellido: new FormControl(Validators.required, Validators.pattern('[a-zA-Z ]*')),
    genero: new FormControl(Validators.required, Validators.required),
    edad: new FormControl(Validators.required, Validators.required),
    celular: new FormControl(Validators.required, Validators.required),
    nacionalidad: new FormControl(Validators.required, Validators.pattern('[a-zA-Z ]*')),
    text: new FormControl('')
  });
  onSubmit() {
  }
  ngOnInit() {

  }
  upload(event) {
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);

    const filepath = `/${randomId}`;
console.log(filepath);
    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);
console.log(task);
    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
    this.uploadURL = fileRef.getDownloadURL();
    console.log(this.uploadURL + 'soy yo');
  }
  public newPerfil(form) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        genero: form.genero,
        edad: form.edad,
        celular: form.celular,
        nacionalidad: form.nacionalidad,
        text: form.text
      };
      console.log(data);
      this.UserServices.createPefil(data).then(() => {
        this.newperfilForm.setValue({
          nombre: '',
          apellido: '',
          genero: '',
          edad: '',
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

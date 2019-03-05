import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../Core/auth.guard';
import { UserService} from '../Core/user.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {

  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;

  public perfiles =[];

  constructor(
    public authService: AuthGuard,
    private _storage: AngularFireStorage,
    public UserServices: UserService

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
    nombre: new FormControl('', Validators.required),
    apellido: new FormControl('', Validators.required),
    genero: new FormControl('', Validators.required),
    edad: new FormControl('', Validators.required),
    celular: new FormControl('', Validators.required),
    nacionalidad: new FormControl('', Validators.required),
    text: new FormControl('')
  })
  onSubmit() {
  }
  ngOnInit() {
    this.UserServices.getPerfiles().subscribe((perfilesSnapshot) =>
    {
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
    const filepath = `images/${randomId}`;

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
    this.authService.setParametro(1);
    try {
      if (this.authService.getParameto() == "1") {
        console.log("falta completar");
      }
    } catch{
      console.log("registro completado");
    }
  }
 /* public newPerfil(form, documentId = this.documentId) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre: form.nombre,
        url: form.url
      }
      this.UserServices.createPefil(data).then(() => {
        console.log('Documento creado exitósamente!');
        this.newperfilForm.setValue({
          nombre: '',
          apellido: '',
          genero: '',
          edad: '',
          celular: '',
          nacionalidad: '',
          text: ''
        });
      }, (error) => {
        console.error(error);
      });
    } else {
      let data = {
        nombre: form.nombre,
        url: form.url
      }
      this.UserServices.updatePerfil().then(() => {
        this.currentStatus = 1;
        this.newperfilForm.setValue({
          nombre: '',
          apellido: '',
          genero: '',
          edad: '',
          celular: '',
          nacionalidad: '',
          text: ''
        });
        console.log('Documento editado exitósamente');
      }, (error) => {
        console.log(error);
      });
    }
  }*/
}

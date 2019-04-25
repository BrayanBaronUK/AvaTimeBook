import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AuthGuard } from '../Core/auth.guard';
import { UserService } from '../Core/user.service';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/internal/observable';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  public currentStatus = 1;
  userFirebase: any;
  public url: string;
  constructor(
    public authService: AuthGuard,
    private storage: AngularFireStorage,
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
      celular: '',
      nacionalidad: '',
      text: ''

    });
  }
  @ViewChild('imageUser') inputImageUser: ElementRef;
  public newperfilForm = new FormGroup({
    id: new FormControl(),
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


  public newPerfil(form) {
    console.log(`Status: ${this.currentStatus}`);
    // tslint:disable-next-line:no-debugger
    debugger;
    if (this.currentStatus === 1) {
      const data = {
        nombre: form.nombre,
        apellido: form.apellido,
        genero: form.genero,
        edad: form.edad,
        url: this.inputImageUser.nativeElement.value,
        celular: form.celular,
        nacionalidad: form.nacionalidad,
        text: form.text
      };
      console.log(data);
      this.UserServices.createPefil(data).then(() => {
        this.newperfilForm.setValue({
          id: '',
          nombre: '',
          apellido: '',
          genero: '',
          edad: '',
          celular: '',
          nacionalidad: '',
          text: ''
        });
        this.flashMensaje.show('Información Cargada correctamente.',
          { cssClass: 'alert-success', timeout: 400000 });
        this.router.navigate(['/crearlibro']);
      }, (error) => {
        console.error(error);
      });
    }
  }
}

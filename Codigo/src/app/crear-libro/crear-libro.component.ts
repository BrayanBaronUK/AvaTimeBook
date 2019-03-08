import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Core/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../Core/user.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {

  public Libros = [];
  public currentStatus = 1;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService,
    public UserServices: UserService
    ) { 
      this.newlibroForm.setValue({
        nombre_libro: '',
        autor_libro: '',
        categoria_libro: '',
        text_libro:''

      })
    }

  ngOnInit() {
  }
  onSubmitAddUser() {

    this.flashMensaje.show('Información Guardada con exito.',
      { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/social']);
  }

  Siguiente(){
    this.router.navigate(['/social']);
  }
  public newlibroForm = new FormGroup({
    nombre_libro: new FormControl(null,Validators.required),
    autor_libro: new FormControl(null,Validators.required),
    categoria_libro: new FormControl(null, Validators.required),
    text_libro: new FormControl(null,Validators.required)
  })

  public newlibro(form) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus == 1) {
      let data = {
        nombre_libro: form.nombre_libro,
        autor_libro: form.autor_libro,
        categoria_libro: form.categoria_libro,
        text_libro: form.text_libro
      }
      this.UserServices.createLibro(data).then(() => {
        this.newlibroForm.setValue({
          nombre_libro: '',
          autor_libro: '',
          categoria_libro: '',
          text_libro: ''
        });
        this.flashMensaje.show('Información Cargada correctamente.',
        {cssClass: 'alert-success', timeout: 4000});
        this.router.navigate(['/social']);
      }, (error) => {
        console.error(error);
      });
    } 
  }
}

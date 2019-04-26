import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Core/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServicioLibroService } from '../Core/servicio-libro.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent implements OnInit {

  public Libros = [];
  public currentStatus = 1;
  userFirebase: any;
  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMensaje: FlashMessagesService,
    public UserServices: ServicioLibroService
  ) {
    this.newlibroForm.setValue({
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
      text_libro: ''
    });
  }
  public newlibroForm = new FormGroup({
    nombre_libro: new FormControl(Validators.required),
    autor_libro: new FormControl(Validators.required),
    categoria_libro: new FormControl(Validators.required),
    text_libro: new FormControl(null)
  });
  ngOnInit() {
  }
  onSubmit() {
  }
  Siguiente() {
    console.log(this.UserServices.getLibro());
    this.router.navigate(['/social']);
  }
  public newlibro(form) {
    console.log(`Status: ${this.currentStatus}`);
    if (this.currentStatus === 1) {
      const data = {
        nombre_libro: form.nombre_libro,
        autor_libro: form.autor_libro,
        categoria_libro: form.categoria_libro,
        text_libro: form.text_libro
      };
      this.UserServices.createLibro(data).then(() => {
        this.newlibroForm.setValue({
          nombre_libro: '',
          autor_libro: '',
          categoria_libro: '',
          text_libro: ''
        });
        console.log(this.UserServices.getLibro());
        this.flashMensaje.show('Información Cargada correctamente.',
          { cssClass: 'alert-success', timeout: 400000 });
      }, (error) => {
        console.error(error);
      });
    }
  }
}

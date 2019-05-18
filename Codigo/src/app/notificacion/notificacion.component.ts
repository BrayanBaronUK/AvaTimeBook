import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  public userLibro = [];
  constructor(public UserLibro: UserService) { }

  ngOnInit() {
    this.TraerLibro();
  }

  TraerLibro() {
    // trae todos los libros
    this.UserLibro.ObtenerComunicaciones().subscribe((libros) => {
      this.userLibro = [];
      libros.map((librodata: any) => {
        this.userLibro.push({
          id: librodata.payload.doc.id,
          nombre: librodata.payload.doc.data().data.nombre,
          url: librodata.payload.doc.data().data.url
        });
      });
    });
  }
}

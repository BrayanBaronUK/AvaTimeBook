import { Component, OnInit, Output, EventEmitter, ViewChild, } from '@angular/core';
import { UserService } from '../Core/user.service';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  public userLibro = [];
  public tem = [];
  public m=[];
  public input: any;
  public input2: any;
  public seguirBoolean = true;
  public colum: any;
  public guardarLibro = [];
  public usrLocal;
  public temporalDatos = [];
  public id;
  public nombre: String;
  public perfil = false;
  public Siguiendo = 'Siguiendo';
  public Seguir = 'Seguir';
  displaySeguir: boolean = false;
  displayNoSeguir: boolean = false;
  constructor(public UserLibro: UserService,
    public flashMensaje: FlashMessagesService) { }

  ngOnInit() {
    this.Traer();
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

  Traer() {
    debugger;
    this.UserLibro.getCantidadSiguiendo().subscribe(m =>{
          this.tem = [];
          m.map( s =>{
            this.tem.push({
              id: s.payload.doc.id
            })
          });
      this.UserLibro.ObtenerComunicaciones().subscribe(g=>{
          this.m =[];
          g.map( s=>{
            this.m.push({
              id: s.payload.doc.id,
              nombre: s.payload.doc.data().data.nombre,
              url: s.payload.doc.data().data.url,
              iud: s.payload.doc.data().id,
              tema: 'Seguir'

            });
          });
          debugger;
          for(var i=0; i<this.tem.length; i++){
            for(var j=0; j<this.m.length; j++){
              if(this.tem[i].id == this.m[j].uid){
                this.m[j].push({
                  tema: 'Siguiendo'
                });
              }
            }
          }
          console.log(this.m);
      });
      debugger;
    });
  }

  onfiltroNoSeguir(data, id) {
    debugger;
    this.temporalDatos = data;
    this.id = id;
    this.displayNoSeguir = true;
    this.nombre = data.nombre;
  }
  onfiltroSeguir(data, id) {
    debugger;
    this.temporalDatos = data;
    this.id = id;
    this.displaySeguir = true;
    this.nombre = data.nombre;
  }
  crearSeguir() {
    this.UserLibro.GuardarPersonaSeguir(this.id, this.temporalDatos);
    this.UserLibro.getPerfil().valueChanges().subscribe((user) => {
      this.UserLibro.GuadarPersonaSeguidor(this.id, user);
      this.flashMensaje.show('Informacion Aceptada.',
        { cssClass: 'alert-success', timeout: 2500 });
    });
    this.onCancelar();
  }
  noSeguir() {
    this.UserLibro.QuitarPersonaSeguir(this.id);
    this.UserLibro.QuitarPersonaSeguidor(this.id);
    this.flashMensaje.show('Informacion Aceptada.',
      { cssClass: 'alert-success', timeout: 2500 });
    this.displayNoSeguir = false;
  }
  onCancelar() {
    this.cerrar.emit();
    this.displaySeguir = false;
    this.displayNoSeguir = false;
  }
}

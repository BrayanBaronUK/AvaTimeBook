import { Component, OnInit, Output, EventEmitter, ViewChild, } from '@angular/core';
import { ServicioFiltroPersonaService } from '../Core/servicio-filtro-persona.service';
import { UserService } from '../Core/user.service';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {PerfilOtroComponent} from '../perfil-otro/perfil-otro.component';
@Component({
  selector: 'app-filtro-person',
  templateUrl: './filtro-person.component.html',
  styleUrls: ['./filtro-person.component.css']
})
export class FiltroPersonComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  @ViewChild('child1') childOne:PerfilOtroComponent;
  filtrouser = [];
  public idEnviar: any;
  public seguir = [];
  public userFirebase: any;
  public nombre: String;
  public input: any;
  public input2: any;
  public seguirBoolean = true;
  public colum: any;
  public guardarLibro = [];
  public usrLocal;
  public temporalDatos = [];
  public id;
  public perfil = false;
  public Siguiendo = 'Siguiendo';
  public Seguir = 'Seguir';
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  public filter2: any; table2: any; tr2: any; td2: any; i2: any; txtValue2: any;
  displaySeguir: boolean = false;
  displayNoSeguir: boolean = false;
  constructor(public userservice: ServicioFiltroPersonaService,
    public userservicePerfil: UserService,
    public servicioLibroService: ServicioLibroService,
    public router: Router,
    public flashMensaje: FlashMessagesService
  ) {

  }

  ngOnInit() {
    this.TraerPersonas();
    this.idEnviar= this.userservicePerfil.getIud(); 
    this.MostrarOcultar();
  }

  change(id, S, data):void{
    console.log("filtro:"+S)
   this.childOne.empezaCargarPerfil(id,S,data); 
   this.MostrarInformacion(); 
   this.perfil = true;
  }
  MostrarInformacion() {
    jQuery(document).on('click', '.perfil', function () {
      document.getElementById('perfil').style.display = 'block';
      document.getElementById('TablaFiltroPersonas').style.display = 'none';
    });
  }
  MostrarOcultar() {
      document.getElementById('perfil').style.display = 'none';
      document.getElementById('TablaFiltroPersonas').style.display = 'block';
  }
  MostrarColumnas() {
    this.colum = [
      { field: 'nombre_libro', header: 'Nombre' },
      { field: 'autor_libro', header: 'Apellido' },
    ];
  }

  TraerPersonas() {
    this.usrLocal = this.userservicePerfil.getPerfilEvaluar();
    this.userservicePerfil.CargarPersonaSeguir().subscribe((seguir) => {
      this.seguir = [];
      seguir.map((seguirperson: any) => {
        this.seguir.push({
          id: seguirperson.payload.doc.id,
          data: seguirperson.payload.doc.data(),
        });
      });
    });

    this.userservice.getPerfiles().subscribe((usuarios) => {
      this.filtrouser = [];
      usuarios.map((usuariosdata: any) => {
        this.filtrouser.push({
          id: usuariosdata.payload.doc.id,
          data: usuariosdata.payload.doc.data(),
        });
      });
      var b = true;
      var count = this.filtrouser.length;
      while (b) {
        b = false;
        if (this.seguir.length == 0) {
          for (var i = 0; i < count; i++) {
            if (this.usrLocal == this.filtrouser[i].id) {
              this.filtrouser.splice(i, 1);
              b = false;
            }
          }
        } else {
          for (var i = 0; i < count; i++) {
            if (i < this.filtrouser.length) {
              for (var j = 0; j < this.seguir.length; j++) {
                if (this.seguir[j].id == this.filtrouser[i].id) {
                  this.filtrouser.splice(i, 1);
                  b = true;
                }
                else if (this.usrLocal == this.filtrouser[i].id) {
                  this.filtrouser.splice(i, 1);
                  b = true;
                }
              }
            }
          }
        }

      }
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
    this.userservicePerfil.GuardarPersonaSeguir(this.id, this.temporalDatos);
    this.userservicePerfil.getPerfil().valueChanges().subscribe((user) => {
      this.userservicePerfil.GuadarPersonaSeguidor(this.id, user);
      this.flashMensaje.show('Informacion Aceptada.',
        { cssClass: 'alert-success', timeout: 2500 });
    });
    this.TraerPersonas();
    this.onCancelar();
  }
  noSeguir() {
    this.userservicePerfil.QuitarPersonaSeguir(this.id);
    this.userservicePerfil.QuitarPersonaSeguidor(this.id);
    this.flashMensaje.show('Informacion Aceptada.',
      { cssClass: 'alert-success', timeout: 2500 });
    this.TraerPersonas();
    this.displayNoSeguir = false;
  }
  onCancelar() {
    this.cerrar.emit();
    this.displaySeguir = false;
    this.displayNoSeguir = false;
  }

  myFunctionNombre() {
    this.input = document.getElementById('myInput');
    if (this.input != null) {

      this.filter = this.input.value.toUpperCase();
      this.table = document.getElementById('myTable');
      this.tr = this.table.getElementsByTagName('tr');
      for (this.i = 0; this.i < this.tr.length; this.i++) {
        this.td = this.tr[this.i].getElementsByTagName('td')[0];
        if (this.td) {
          this.txtValue = this.td.textContent || this.td.innerText;
          if (this.txtValue.toUpperCase().indexOf(this.filter) > -1) {
            this.tr[this.i].style.display = '';
          } else {
            this.tr[this.i].style.display = 'none';
          }
        }
      }
    } else {
      this.tr.getElementsByTagName('td').style.display = 'block';
    }

  }

  myFunctionNombre2() {
    this.input2 = document.getElementById('mInput');
    if (this.input2 != null) {

      this.filter2 = this.input2.value.toUpperCase();
      this.table2 = document.getElementById('myTable2');
      this.tr2 = this.table2.getElementsByTagName('tr');
      for (this.i = 0; this.i < this.tr2.length; this.i++) {
        this.td2 = this.tr2[this.i].getElementsByTagName('td')[0];
        if (this.td2) {
          this.txtValue2 = this.td2.textContent || this.td2.innerText;
          if (this.txtValue2.toUpperCase().indexOf(this.filter2) > -1) {
            this.tr2[this.i].style.display = '';
          } else {
            this.tr2[this.i].style.display = 'none';
          }
        }
      }
    } else {
      this.tr2.getElementsByTagName('td').style.display = 'block';
    }

  }

  enviarPerfil(id){

  }
}

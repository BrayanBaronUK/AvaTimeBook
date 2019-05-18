import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { GrupoServiceService } from '../Core/grupo-service.service';
import { ServicioFiltroPersonaService } from '../Core/servicio-filtro-persona.service';
import { UserService} from '../Core/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  public crearGrupo: any;
  public nombre: any;
  public temporalNombre: any;
  public idGrupo: any;
  public grupos: any;
  public personas: any;
  public personaseleccionada: any;
  public guardarPersonasGrupo: any;
  public filteredCountriesMultiple: any[];
  public display = false;
  public displayEliminar = false;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  public input: any;
  public uidUsr: any;
  constructor(public flashMensaje: FlashMessagesService,
    public grupoS: GrupoServiceService,
    public person: ServicioFiltroPersonaService,
    public router: Router,
    public user: UserService) { }

  ngOnInit() {
    this.TraerGrupos();
    this.Traerperson();
    this.variables();
  }

  TraerGrupos() {
    // trae todos los grupos
    this.grupoS.getGrupos().subscribe(usuarios => {
      this.grupos = [];
      usuarios.map((element) => {
        this.grupos.push({
          id: element.payload.doc.id,
          nombre: element.payload.doc.data().nombre_grupo,
          data: element.payload.doc.data().data
        });
      });
    });
  }

  variables() {
  }
  onCancelar() {
    this.cerrar.emit();
    this.nombre = '';
    this.personaseleccionada = null;
    this.display = false;
    this.displayEliminar = false;
  }
  vistaGrupo(nombre, data, id) {
    this.display = true;
    this.guardarPersonasGrupo = data;
    this.temporalNombre = nombre;
    this.idGrupo = id;
  }
  EliminarPersona(id) {
    this.uidUsr = this.user.getIud();
    var count = this.guardarPersonasGrupo.length;
    var b = true;
    while (b) {
      b = false;
      for (var i = 0; i < count; i++) {
        if (id == this.guardarPersonasGrupo[i].id) {
          this.guardarPersonasGrupo.splice(i, 1);
          b = true;
        }
      }
    }
    this.grupoS.ActualizarGrupo(this.idGrupo, this.temporalNombre, this.guardarPersonasGrupo, this.uidUsr),
      this.flashMensaje.show('Actualizado.',
        { cssClass: 'alert-success', timeout: 4000 });
    this.onCancelar();
  }
  onGuardarGrupocreado() {
    this.variables();
    this.uidUsr = this.user.getIud();
    for(var i=0; i< this.personaseleccionada.length; i++){
       this.grupoS.createGrupoSegudor(this.nombre,this.personaseleccionada,this.personaseleccionada[i].id, this.uidUsr);
    }
    this.grupoS.createGrupo(this.nombre, this.personaseleccionada, this.uidUsr);
    this.flashMensaje.show('Grupo creado.',
      { cssClass: 'alert-success', timeout: 4000 });
    this.onCancelar();
  }

  EliminarGrupoDisplay(id, data){
    this.idGrupo =id;
    this.displayEliminar = true;
    this.guardarPersonasGrupo = data;
  }
  EliminarGrupo() {
    var count = this.guardarPersonasGrupo.length;
    var b = true;
    while (b) {
      b = false;
      for (var i = 0; i < count; i++) {
        if (this.guardarPersonasGrupo[i].uid == this.guardarPersonasGrupo[i].uid) {
          this.guardarPersonasGrupo.splice(i, 1);
          b = true;
        }
      }
    }
    this.grupoS.eliminarGrupo(this.idGrupo),
      this.flashMensaje.show('Grupo Eliminado.',
        { cssClass: 'alert-success', timeout: 4000 });
    this.displayEliminar = false;
  }

  Traerperson() {
    // trae todos los libros
    this.person.getSeguidores().subscribe((p) => {
      this.personas = [];
      p.map((persondata: any) => {
        this.personas.push({
          id: persondata.payload.doc.id,
          nombre: persondata.payload.doc.data().nombre
        });
      });
    });
  }


  BuscarPersonas(event) {
    debugger;
    this.filteredCountriesMultiple = this.filterCountry(event.query, this.personas);
  }

  filterCountry(query, countries: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
      debugger;
      let country = countries[i];
      if (country.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }
    console.log(filtered);
    return filtered;
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

}

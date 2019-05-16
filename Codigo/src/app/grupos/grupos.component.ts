import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { GrupoServiceService } from '../Core/grupo-service.service';
import { ServicioFiltroPersonaService } from '../Core/servicio-filtro-persona.service';
import { AuthService } from '../Core/auth.service';
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
  public grupos: any;
  public personas: any;
  public personaseleccionada: any;
  public filteredCountriesMultiple: any[];
  constructor(public flashMensaje: FlashMessagesService,
    public grupoS: GrupoServiceService,
    public person: ServicioFiltroPersonaService,
    public router: Router) { }

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
          data: element.payload.doc.data()
        });
      });
    });
  }

  variables(){
  }
  onCancelar() {
    this.cerrar.emit();
    this.nombre = '';
    this.personaseleccionada = null;
  }
  onGuardarGrupocreado() {
    this.variables();
    this.grupoS.createGrupo(this.nombre, this.personaseleccionada);
    this.flashMensaje.show('Grupo creado.',
      { cssClass: 'alert-success', timeout: 4000 });
    this.onCancelar();
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

}

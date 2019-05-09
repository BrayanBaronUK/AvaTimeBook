import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { GrupoServiceService } from '../Core/grupo-service.service';
import { ServicioFiltroPersonaService } from '../Core/servicio-filtro-persona.service';
import { AuthService } from '../Core/auth.service';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  public crearGrupo: any;
  public grupos: any;
  public personas: any;
  personaseleccionada: any[];
  filteredCountriesMultiple: any[];
  constructor(public flashMensaje: FlashMessagesService,
    public grupoS: GrupoServiceService,
    public person: ServicioFiltroPersonaService) { }

  ngOnInit() {
    this.CrearGrupos();
    this.TraerGrupos();
    this.Traerperson();
    this.OcultarTablero();

  }

  TraerGrupos() {
    // trae todos los grupos
    this.grupoS.getGrupos().subscribe(usuarios => {
      this.grupos = usuarios.map((element) => {
        return element.payload.doc.data();
      });
    });
  }

  CrearGrupos() {
    this.crearGrupo = {
      id: '',
      nombre_grupo: '',
      personas_grupo: ''
    };
  }
  onCancelar() {
    this.crearGrupo = {
      id: '',
      nombre_grupo: '',
      personas_grupo: ''
    };
    this.cerrar.emit();
  }
  onGuardarGrupocreado() {
    this.grupoS.createGrupo(this.crearGrupo);
    this.crearGrupo = {
      id: '',
      nombre_libro: '',
      autor_libro: '',
      categoria_libro: '',
      text_libro: ''
    };
    this.flashMensaje.show('Grupo creado.',
      { cssClass: 'alert-success', timeout: 4000 });
    this.onCancelar();
  }

  Traerperson() {
    this.personas = {
      nombre: '',
      apellido: '',
    };
    // trae todos los libros
    this.person.getPerfiles().subscribe((p) => {
      this.personas = [];
      p.map((persondata: any) => {
        this.personas.push({
          id: persondata.payload.doc.id,
          data: persondata.payload.doc.data()
        });
      });
    });
  }

  OcultarTablero() {
    // if (this.personaseleccionada == null) {
    //   $('.ui-listbox-list-wrapper').css('none');
    // } else {
    //   $('.ui-listbox-list-wrapper').css('none');
    // }
    jQuery(document).on('click', '.crearfiltro', function () {
      document.getElementById('#ui-listbox-list-wrapper').style.display = 'none';
    });
  }

  BuscarPersonas(event) {
    debugger;
          this.filteredCountriesMultiple = this.filterCountry(event.query, this.personas);
    }

  filterCountry(query, countries: any[]):any[] {
      debugger;
      console.log(countries);
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let filtered : any[] = [];
      for(let i = 0; i < countries.length; i++) {
          let country = countries[i];
          if(country.data.nombre.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              filtered.push(country);
          }
      }
      console.log(filtered);
      return filtered;
  }
 
  }

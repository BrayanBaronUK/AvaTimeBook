import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { GrupoServiceService} from '../Core/grupo-service.service';
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  @Output() cerrar = new EventEmitter();
  public crearGrupo: any;
  public grupos: any;
  constructor(public flashMensaje: FlashMessagesService,
    public grupoS: GrupoServiceService) { }

  ngOnInit() {
    this.CrearGrupos();
    this.TraerGrupos();
  }

  TraerGrupos() {
    // trae todos los comentarios
    this.grupoS.getGrupos().subscribe((usuarios) => {
      this.grupos = [];
      usuarios.forEach((usuariosdata: any) => {
        this.grupos.push({
          id: usuariosdata.payload.doc.id,
          data: usuariosdata.payload.doc.data()
        });
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
}

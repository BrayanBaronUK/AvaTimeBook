import { Component, OnInit } from '@angular/core';
import { ServicioFiltroPersonaService } from '../Core/servicio-filtro-persona.service';
import { UserService } from '../Core/user.service';
@Component({
  selector: 'app-filtro-person',
  templateUrl: './filtro-person.component.html',
  styleUrls: ['./filtro-person.component.css']
})
export class FiltroPersonComponent implements OnInit {

  public filtrouser = [];
  public input: any;
  public input2: any;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  public filter2: any; table2: any; tr2: any; td2: any; i2: any; txtValue2: any;
  constructor(public userservice: ServicioFiltroPersonaService,
    public userservicePerfil: UserService
  ) {


  }

  ngOnInit() {
    this.TraerLibros();
  }



  TraerLibros() {
    // trae todos los comentarios
    this.userservice.getPerfiles().subscribe((usuarios) => {
      this.filtrouser = [];
      usuarios.forEach((usuariosdata: any) => {
        this.filtrouser.push({
          id: usuariosdata.payload.doc.id,
          data: usuariosdata.payload.doc.data()
        });
      });
    });
  }

  onfiltro(id) {
    console.log('el id del usuario es:' + id);
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

  myFunctionApellido() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.input2 = document.getElementById('myInput');
    this.filter2 = this.input2.value.toUpperCase();
    this.table2 = document.getElementById('myTable');
    this.tr2 = this.table2.getElementsByTagName('tr');
    for (this.i2 = 0; this.i2 < this.tr2.length; this.i2++) {
      this.td2 = this.tr2[this.i2].getElementsByTagName('td')[1];
    }
  }

}

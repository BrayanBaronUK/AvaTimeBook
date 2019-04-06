import { Component, OnInit } from '@angular/core';
import { ServicioFiltroPersonaService} from '../Core/servicio-filtro-persona.service';
import { UserService} from '../Core/user.service';
@Component({
  selector: 'app-filtro-person',
  templateUrl: './filtro-person.component.html',
  styleUrls: ['./filtro-person.component.css']
})
export class FiltroPersonComponent implements OnInit {

  public filtrouser = [];
  public input: any;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
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

  onflitro(id) {
    console.log(id);
 }

  myFunction() {
    // tslint:disable-next-line:no-debugger
    debugger;
    this.input = document.getElementById('myInput');
    this.filter = this.input.value.toUpperCase();
    console.log(this.filter);
    this.table = document.getElementById('myTable');
    console.log(this.table);
    this.tr = this.table.getElementsByTagName('tr');
    console.log(this.tr);
    for (this.i = 0; this.i < this.tr.length; this.i++) {
      this.td = this.tr[this.i].getElementsByTagName('td')[0];
      console.log(this.td);
      if (this.td) {
        this.txtValue = this.td.textContent || this.td.innerText;
        console.log(this.td);
        if (this.txtValue.toUpperCase().indexOf(this.filter) > -1) {
          console.log(this.filter);
          this.tr[this.i].style.display = '';
          console.log(this.tr);
        } else {
          this.tr[this.i].style.display = 'none';
          console.log(this.tr);
        }
      }
    }
  }

}

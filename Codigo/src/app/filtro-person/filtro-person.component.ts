import { Component, OnInit } from '@angular/core';
import { ServicioFiltroPersonaService } from '../Core/servicio-filtro-persona.service';
import { UserService } from '../Core/user.service';
import { ServicioLibroService } from '../Core/servicio-libro.service';
@Component({
  selector: 'app-filtro-person',
  templateUrl: './filtro-person.component.html',
  styleUrls: ['./filtro-person.component.css']
})
export class FiltroPersonComponent implements OnInit {

  filtrouser = [];
  public p = [];
  public input: any;
  public input2: any;
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  public filter2: any; table2: any; tr2: any; td2: any; i2: any; txtValue2: any;
  constructor(public userservice: ServicioFiltroPersonaService,
    public userservicePerfil: UserService,
    public servicioLibroService: ServicioLibroService
  ) {


  }

  ngOnInit() {
    this.TraerPersonas();
  }



  TraerPersonas() {
    this.userservice.getPerfiles().subscribe((usuarios) => {
      usuarios.map((usuariosdata: any) => {
        this.servicioLibroService.getLibros(usuariosdata.payload.doc.id).subscribe((libro) => {

          this.filtrouser.push({
            id: usuariosdata.payload.doc.id,
            data: usuariosdata.payload.doc.data(),
            libros: [
              libro.map(l => {
                 // tslint:disable-next-line:no-unused-expression
                 return  l.payload.doc.data();
              })
              ]
          });
        });
      });
    });
    console.log(this.filtrouser);
  }
  onfiltro(id) {
    console.log(id);
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

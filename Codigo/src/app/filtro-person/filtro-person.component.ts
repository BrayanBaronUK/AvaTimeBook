import { Component, OnInit } from '@angular/core';
import { ServicioFiltroPersonaService } from '../Core/servicio-filtro-persona.service';
import { UserService } from '../Core/user.service';
import { ServicioLibroService } from '../Core/servicio-libro.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-filtro-person',
  templateUrl: './filtro-person.component.html',
  styleUrls: ['./filtro-person.component.css']
})
export class FiltroPersonComponent implements OnInit {

  filtrouser = [];
  public seguir = [];
  public userFirebase: any;
  public input: any;
  public input2: any;
  public seguirBoolean = true;
  public colum: any;
  public guardarLibro = [];
  public usrLocal = [];
  public filter: any; table: any; tr: any; td: any; i: any; txtValue: any;
  public filter2: any; table2: any; tr2: any; td2: any; i2: any; txtValue2: any;
  constructor(public userservice: ServicioFiltroPersonaService,
    public userservicePerfil: UserService,
    public servicioLibroService: ServicioLibroService,
    public router: Router
  ) {

  }

  ngOnInit() {
    this.TraerPersonas();
  }

  MostrarColumnas() {
    this.colum = [
      { field: 'nombre_libro', header: 'Nombre' },
      { field: 'autor_libro', header: 'Apellido' },
    ];
  }

  TraerPersonas() {
    this.userservicePerfil.CargarPersonaSeguir().subscribe((seguir) => {
      this.userservice.getPerfiles().subscribe((usuarios) => {
        this.userservicePerfil.getPerfilEvaluar().subscribe((usrLocal) => {
          this.usrLocal[0] = usrLocal.id;
        });
        usuarios.map((usuariosdata: any) => {
          this.servicioLibroService.getLibros(usuariosdata.payload.doc.id).subscribe((libro) => {
            libro.map(l => {
              this.guardarLibro.push({
                id: l.payload.doc.id,
                data: l.payload.doc.data()
              });
            });
          });
          this.filtrouser.push({
            id: usuariosdata.payload.doc.id,
            data: usuariosdata.payload.doc.data(),
            libros: [this.guardarLibro]
          });
        });
        seguir.map((seguirperson: any) => {
          for (var i = 0; i < this.filtrouser.length; i++) {
            if (seguirperson.payload.doc.id == this.filtrouser[i].id) {
              this.seguir.push({
                id: seguirperson.payload.doc.id,
                data: seguirperson.payload.doc.data(),
                libros: [
                  this.filtrouser[i].libros
                ]
              });
              this.filtrouser.splice(i, 1);
            } 
            else if (this.usrLocal[0] == this.filtrouser[i].id) {
              this.filtrouser.splice(i, 1);
            }
          }

        });
      });
    });
    console.log(this.seguir);
    console.log(this.filtrouser);
    console.log(this.usrLocal);
  }
  onfiltro(data, id) {
    this.userservicePerfil.GuardarPersonaSeguir(id, data);
    this.userservicePerfil.getPerfil().valueChanges().subscribe((user) => {
      this.userservicePerfil.GuadarPersonaSeguidor(id, user); 
      this.seguir = [];
      this.TraerPersonas();
    });  

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

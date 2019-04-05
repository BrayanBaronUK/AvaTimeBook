import { Component, OnInit } from '@angular/core';
import { ServicioLibroService} from '../Core/servicio-libro.service';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {

  public filtrouser = [];

  constructor(public userservice: ServicioLibroService) {


   }

  ngOnInit() {
    this.TraerLibros();
  }



  TraerLibros() {
    // trae todos los comentarios
    this.userservice.obtenerLibrofilter1().subscribe((usuarios) => {
     this.filtrouser = [];
     usuarios.forEach((usuariosdata: any) => {
       this.filtrouser.push({
         id: usuariosdata.payload.doc.id,
         data: usuariosdata.payload.doc.data()
       });
     });
   });
   console.log(this.filtrouser);
 }

 myFunction() {
   debugger;
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");

  filter = input.value.toUpperCase();
  console.log(filter);
  table = document.getElementById("myTable");
  console.log(table);
  tr = table.getElementsByTagName("tr");
  console.log(tr);
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    console.log(td);
    if (td) {
      txtValue = td.textContent || td.innerText;
      console.log(td);
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        console.log(filter);
        tr[i].style.display = "";
        console.log(tr);
      } else {
        tr[i].style.display = "none";
        console.log(tr);
      }
    }       
  }
}

}
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material'
import { UserService } from '../Core/user.service';
import { element } from 'protractor';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
 
export class LibrosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'nombre_libro' ];
  public items;
  public dataSource2;
  public datos;
  applyFilter(filterValue: string) {
   // this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  constructor(public UserServices: UserService) {
 
     
    //this.dataSource2 =   new MatTableDataSource(this.datos);
   }
  
  ngOnInit() {
    this.UserServices.getPerfiles().subscribe(actionArray => {
      this.items = actionArray.map(item => {
          return {
              id : item.payload.doc.id,
              ...item.payload.doc.data()
          }
      })
    })
  }

}



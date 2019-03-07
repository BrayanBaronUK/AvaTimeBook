import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.css']
})
export class LibrosComponent implements OnInit {
  elements: any = [];
  headElements = ['ID', 'First', 'Last', 'Handle'];

  searchText: string = '';
  previous: string;
  constructor() {

   }
 
  ngOnInit() {
     
  }
 

}
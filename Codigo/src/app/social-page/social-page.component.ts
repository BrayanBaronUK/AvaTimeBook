import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';
@Component({
  selector: 'app-social-page',
  templateUrl: './social-page.component.html',
  styleUrls: ['./social-page.component.css']
})
export class SocialPageComponent implements OnInit {

  userFirebase
  constructor(public UserServices: UserService) {
   }

  ngOnInit() {
    this.userFirebase = {nombre: "",
  apellido: "",
  genero: "",
  edad: "",
  url: "",
  celular: "",
  nacionalidad: "",
  text: "",
  nombre_libro: "",
  autor_libro: "",
  text_libro: "",
  url_libro: ""}
  this.UserServices.getPerfil(this.UserServices.getIud()).valueChanges().subscribe((user) =>{
      console.log(this.userFirebase = user)
      
    });
    console.log(this.userFirebase) 
  }

}

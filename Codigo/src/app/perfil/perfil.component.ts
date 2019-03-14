import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private foto: string;
  userFirebase
  constructor(public UserServices: UserService) {
    //this.foto = this.userFirebase.nombre;
  }


  ngOnInit() {
    this.userFirebase = {
      nombre: "",
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
      url_libro: ""
    }
    this.UserServices.getPerfil().valueChanges().subscribe((user) => {
      console.log(this.userFirebase = user)

    });
    console.log(this.userFirebase)
  }


subirFoto($event: any){

  let fileReader = new FileReader();
  //let ruta= fileReader.readAsDataURL($event.target.files[0])//
 //   console.log("rtua", ruta)//
  //this.foto= ruta;
  fileReader.onload = ($event: any) => {
    this.foto = $event.target.result;

  }
  fileReader.readAsDataURL($event.target.files[0])


  //let nombreFoto= $event.target.files[0].name;//
}

  

}

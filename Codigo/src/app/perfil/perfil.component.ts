import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private foto: string;

  constructor() {
    this.foto='http://ssl.gstatic.com/accounts/ui/avatar_2x.png';
   }


   


  ngOnInit() {
  }

  subirFoto($event: any){

    let fileReader = new FileReader();
    //let ruta= fileReader.readAsDataURL($event.target.files[0])
  //  console.log("rtua", ruta)
   // this.foto= ruta;
    fileReader.onload = ($event: any)=>{
     this.foto= $event.target.result;

    }
    fileReader.readAsDataURL($event.target.files[0])

   
    // let nombreFoto= $event.target.files[0].name;
  }

  

}

import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../Core/auth.guard';
@Component({
  selector: 'app-form-person',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css']
})
export class FormPersonComponent implements OnInit {

  constructor(
    public authService: AuthGuard 
  ) { }

  ngOnInit() {
  }

  onClickValidar() {
    this.authService.setParametro(1);
    try{
      if(this.authService.getParameto() == "1"){
        console.log("falta completar");
      }
    }catch{
      console.log("registro completado");
    }
  }
}

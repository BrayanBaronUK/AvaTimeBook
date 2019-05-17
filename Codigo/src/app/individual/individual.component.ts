import { Component, OnInit } from '@angular/core';
import { IndividualService } from './Service/individual.service'; 
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../Core/auth.service';
@Component({
  selector: 'app-individual',
  templateUrl: './individual.component.html',
  styleUrls: ['./individual.component.css']
})
export class IndividualComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;
  mensaje: string = "";
  elemento: any;
  openPopup: Function;//for emoji
  room : any;
  message: any;
  _csroom : any;
  _csrmesagess : any;
  roomactual : any;
  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    public _cs: IndividualService,
    public _csmessage: IndividualService,
    //public axuliar: MessagesService,
  ) { 
    this._csroom = [];
    this._cs.chats = [];
    this._cs.Grupos().subscribe((room) => {
      this._csroom = [];
      room.forEach((cdata: any) => {
        this._csroom.push({
          id: cdata.payload.doc.id,
          data: cdata.payload.doc.data()
        });
      });
    });
   /* this._cs.room().subscribe((room) => {
      this._csroom = [];
      room.forEach((cdata: any) => {
        this._csroom.push({
          id: cdata.payload.doc.id,
          data: cdata.payload.doc.data()
        });
      });
    });*/ //Grupos 
    console.log( "Error");
  

    this._cs.room().subscribe( ()=> {
      setTimeout( ()=> {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20)
     
  });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }
  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }

  roomchange(value){
    this.roomactual = value;
    this._cs.Gruposmeesages(value).subscribe( ()=> {
      setTimeout( ()=> {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20) 
    });
    /*this._cs.meesages(value).subscribe( ()=> {//funciona
      setTimeout( ()=> {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20)
    });*/
    debugger; 
    
  }

  enviar_mensaje(){
    
    console.log( this.mensaje );

    if( this.mensaje.length === 0){
      return;
    }

    /*this._cs.agregarMensaje(this.roomactual, this.mensaje )
          .then( ()=>this.mensaje="")
          .catch( (err)=>console.error('Error al enviar', err));
  }*/
  this._cs.GrupoagregarMensaje(this.roomactual, this.mensaje )
          .then( ()=>this.mensaje="")
          .catch( (err)=>console.error('Error al enviar', err));
  }
  
}

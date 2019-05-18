import { Component, OnInit } from '@angular/core';
import { RoomService } from './Service/room.service';
import { MessagesService } from './Service/messages.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../Core/auth.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})

export class RoomComponent implements OnInit {
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
  dueño : any;
  rommis : any [];
  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    public _cs: RoomService,
    public _csmessage: RoomService,
    //public axuliar: MessagesService,
  ) { 
    this._csroom = [];
    this._cs.chats = [];
    this._cs.Grupos().subscribe((room) => {
      this._csroom = [];
      room.forEach((cdata: any) => {
        this._csroom.push({
          id: cdata.payload.doc.id,
          data: cdata.payload.doc.data(),
          array : cdata.payload.doc.data().data
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

  roomchange(value, array: any [], dueño){
    this.roomactual = value;
    this.rommis = array;
    this.dueño = dueño;
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
 
  this._cs.GrupoagregarMensaje(this.roomactual, this.mensaje, this.rommis, this.dueño )
          .then( ()=>this.mensaje="")
          .catch( (err)=>console.error('Error al enviar', err));
     for (var i = 0 ; i< this.rommis.length ; i++){

     }       
  }

  
}

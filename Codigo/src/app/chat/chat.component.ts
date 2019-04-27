    
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../Core/chat.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../Core/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  chat$: Observable<any>;
  newMsg: string;
  mensaje: string = "";
  elemento: any;
  
  openPopup: Function;//for emoji
  constructor(
    
    private route: ActivatedRoute,
    public auth: AuthService,
    public _cs: ChatService,
  ) {
    this._cs.cargarMensjes().subscribe( ()=> {
        setTimeout( ()=> {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        },20)
       
    });
  }
  enviar_mensaje(){
    console.log( this.mensaje );

    if( this.mensaje.length === 0){
      return;
    }

    this._cs.agregarMensaje( this.mensaje )
          .then( ()=>this.mensaje="")
          .catch( (err)=>console.error('Error al enviar', err));
  }
  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }
  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }
 

}

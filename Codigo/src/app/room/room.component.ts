import { Component, OnInit } from '@angular/core';
import { RoomService } from './Service/room.service';
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
  _csroom : any;
  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    public _cs: RoomService
  ) { 
 
    this._cs.room().subscribe((room) => {
      this._csroom = [];
      room.forEach((cdata: any) => {
        this._csroom.push({
          id: cdata.payload.doc.id,
          data: cdata.payload.doc.data()
        });
      });
    });


    this._cs.room().subscribe( ()=> {
      setTimeout( ()=> {
        this.elemento.scrollTop = this.elemento.scrollHeight;
      },20)
     
  });
  }

  ngOnInit() {
    this.elemento = document.getElementById('room-lis');
  }
  setPopupAction(fn: any) {
    console.log('setPopupAction');
    this.openPopup = fn;
  }

  roomchange(value){
    console.log(value);
    debugger;
  }
}

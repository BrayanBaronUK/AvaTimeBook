import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../../Core/auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { UserService } from '../../Core/user.service';
import { Room } from "../../interface/room.interface";
@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public uids: any;
  private itemsCollection: any;
  public rooms: Room[] = [];
  public usuario:any = {};
  public useruid:any;
  public mensajes: any = {};
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private userse : UserService,
    private ref : any,
  ) {
   // this.itemsCollection = this.afs.collection("messages").ref.where();
  }

  getmessages($value){
    
   return  this.afs.collection("messages").ref.where('roomId', "==", $value);
  }
}

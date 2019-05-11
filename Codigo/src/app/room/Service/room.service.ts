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
export class RoomService {
  public uids: any;
  private itemsCollection: AngularFirestoreCollection<Room>;
  public rooms: Room[] = [];
  public usuario:any = {};
  public useruid:any;
  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private userse : UserService,
  ) { }

  room(){
   return this.afs.collection<Room>('rooms').snapshotChanges();

 /* return this.itemsCollection.valueChanges()
                                .map( (rooms:Room[]) =>{
                                  
                                  this.rooms = [];
                                  for( let room of rooms ){
                                    this.rooms.unshift( room );
                                  }
                                
                                })*/  
   // return this.itemsCollection.snapshotChanges();
  }
}

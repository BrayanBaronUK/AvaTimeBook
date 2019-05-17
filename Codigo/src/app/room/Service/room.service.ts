import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../../Core/auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { UserService } from '../../Core/user.service';
import { Room } from "../../interface/room.interface";
import { Mensaje } from "../../interface/mensajes.interface";
@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public uids: any;
  private itemsCollection: AngularFirestoreCollection<Room>;
  public rooms: any = [];
  public roomss: any = [];
  public roomss2 : Room;
  public usuario:any = {};
  public useruid:any;
  public chats: Mensaje[] = [];
  private itemsCollectionmensajes: AngularFirestoreCollection<Mensaje>;
  constructor(
    private afs: AngularFirestore,
    private afs2: AngularFirestore,
    private auth: AuthService,
    private router: Router,
    private userse : UserService,
  ) {

    this.auth.afAuth.authState.subscribe( user=> {
      console.log('soy el user', user);
      if(!user){
        return;
      }
      this.usuario = {
        nombre: '',
        apellido: '',
        genero: '',
        edad: '',
        url: '',
        celular: '',
        nacionalidad: '',
        text: '',
      };
      
      this.usuario.nombre = userse.getPerfil().valueChanges().subscribe( 
        (person)=>{
           this.usuario = person;
          
        } );
      this.useruid = user.uid;
    })
 
    console.log('me llame' , this.usuario);
   }

  room(){
   return this.afs.collection('rooms').snapshotChanges();

 /* return this.itemsCollection.valueChanges()
                                .map( (rooms:Room[]) =>{
                                  
                                  this.rooms = [];
                                  for( let room of rooms ){
                                    this.rooms.unshift( room );
                                  }
                                
                                })*/  
   // return this.itemsCollection.snapshotChanges();
  }
  meesages(value){
    debugger;
    this.itemsCollectionmensajes = this.afs2.collection('rooms').doc(value).collection('messages', ref => 
                                                  ref.orderBy('fecha','desc'));
    return this.itemsCollectionmensajes.valueChanges()
                                .map( (mensajes:Mensaje[]) =>{
                                  
                                  this.chats = [];
                                  for( let mensaje of mensajes ){
                                    this.chats.unshift( mensaje );
                                  }
                                
                                })                                              
  }

  agregarMensaje(value, texto:string ){
    let mensaje : Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.userse.getIud(),
    
    }
    return this.afs2.collection('rooms').doc(value).collection('messages').add(mensaje);

  // return this.itemsCollection.add( mensaje );
  }
  agregarRoom(value:string){
    let roomss2 : Room ={
      nome : value,
    }
    this.afs.collection('room').add(roomss2);
  }
}

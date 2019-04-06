import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { UserService } from './user.service';
import { Mensaje } from "../interface/mensajes.interface";
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public uids: any;
  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario:any = {};
  public useruid:any;
  constructor(
    private afs: AngularFirestore,
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
             console.log('soy la persona', this.usuario);
          } );
        this.useruid = user.uid;
      })
   
      console.log('me llame' , this.usuario);
      //this.usuario.nombre = user.getPerfil(this.usuario.uid).valueChanges().subscribe(user)
  }
  
  cargarMensjes(){

    this.itemsCollection = this.afs.collection<Mensaje>('chats', 
                                ref => ref.orderBy('fecha','desc')
                                .limit(5) );

    return this.itemsCollection.valueChanges()
                                .map( (mensajes:Mensaje[]) =>{
                                  
                                  this.chats = [];
                                  for( let mensaje of mensajes ){
                                    this.chats.unshift( mensaje );
                                  }
                                
                                })

  }
   
  agregarMensaje( texto:string ){
    let mensaje : Mensaje = {
      nombre: this.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.userse.getIud(),

    }
   return this.itemsCollection.add( mensaje );
  }


}

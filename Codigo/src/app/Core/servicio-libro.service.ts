import { Injectable, KeyValueDiffers } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from '../Core/auth.service';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ServicioLibroService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }
////////obtener usuario actual
  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      // tslint:disable-next-line:no-shadowed-variable
      const user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
          return user.uid;
        } else {
          reject('No user logged in');
        }
      });
    });
  }
  getIud() {
    return firebase.auth().currentUser.uid;
  }
  //actualizar usuario actual
  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }
  //crear libro
  createLibro(data: { nombre_libro: string, autor_libro: string, categoria_libro: string, text_libro: string }) {
    return this.db.collection('perfil').doc(this.getIud()).collection('libro-persona').doc(this.getIud()).collection('libro').add(data);
  }
  //obtener libro
  getLibro() {
    return this.db.collection('perfil').doc(this.getIud()).
    collection('libro-persona').doc(this.getIud()).collection('libro').snapshotChanges();
  }
  //actualizar libro
  updateLibro(id, libro: any) {
   return this.db.collection('perfil').doc(this.getIud()).
   collection('libro-persona').doc(this.getIud()).collection('libro').doc(id).set(libro);
  }
  //obtener libro
  deleteLibro(id) {
    return this.db.collection('perfil').doc(this.getIud()).
    collection('libro-persona').doc(this.getIud()).collection('libro').doc(id).delete();
  }

  /*obtenerLibrofilter(){
      var hola = this.db.collection('perfil');
      var hola1 = hola.where(this.getIud(), "==", this.getIud()));
      var hola2 = hola1.collection('libro-persona');
      var hola3 = hola2.where(this.getIud(), "==", this.getIud()));
      var hola4 = hola3.collection('libro').snapshotChanges();
      return hola4;
  }
*/
//metodo para el filtro
  obtenerLibrofilter1(){
    debugger;
    return this.db.collection('perfil', (ref) => ref.where(this.getIud(),'>',true).where(this.getIud(),'<',true)).doc(this.getIud()).collection('libro-persona',  (ref) => ref.where(this.getIud(),'>',true).where(this.getIud(),'<',true)).doc(this.getIud()).collection('libro').snapshotChanges();
  }
}

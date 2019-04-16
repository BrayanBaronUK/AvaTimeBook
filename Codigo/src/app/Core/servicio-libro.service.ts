import { Injectable, KeyValueDiffers } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from '../Core/auth.service';
import * as firebase from 'firebase/app';
import { Libros} from '../variables/libros';
@Injectable({
  providedIn: 'root'
})
export class ServicioLibroService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

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
  createLibro(data: { nombre_libro: string, autor_libro: string, categoria_libro: string, text_libro: string }) {
    return this.db.collection('perfil').doc(this.getIud()).collection('libro-persona').doc(this.getIud()).collection('libro').add(data);
  }
  getLibro() {
    // tslint:disable-next-line:no-debugger
    debugger;
    return this.db.collection('perfil').doc(this.getIud()).
    collection('libro-persona').doc(this.getIud()).collection('libro').snapshotChanges();
  }

  updateLibro(id, libro: any) {
   return this.db.collection('perfil').doc(this.getIud()).
   collection('libro-persona').doc(this.getIud()).collection('libro').doc(id).set(libro);
  }
  deleteLibro(id) {
    return this.db.collection('perfil').doc(this.getIud()).
    collection('libro-persona').doc(this.getIud()).collection('libro').doc(id).delete();
  }

  obtenerLibrofilter1() {
    // tslint:disable-next-line:no-debugger
    debugger;
    return this.db.collection('perfil', (ref) => ref.where(this.getIud(), '>', true).where(this.getIud(), '<', true)).
    // tslint:disable-next-line:max-line-length
    doc(this.getIud()).collection('libro-persona',  (ref) => ref.where(this.getIud(), '>', true).where(this.getIud(), '<', true)).doc(this.getIud()).collection('libro').snapshotChanges();
  }

}

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root'
})
export class ServicioComentarioService {

  
  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) { }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
          return user.uid;
        } else {
          reject('No user logged in');
        }
      })
    })
  }
  getIud() {
    return firebase.auth().currentUser.uid;
  }
  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res)
      }, err => reject(err))
    })
  }
  createComentario(data: { text: string }) {
    return this.db.collection('perfil').doc(this.getIud()).collection('comentario').add(data);
  }
  getComentario() {
    return this.db.collection('perfil').doc(this.getIud()).collection('comentario').snapshotChanges();
  }
}

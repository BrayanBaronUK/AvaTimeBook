import { Injectable } from '@angular/core';
//BEGIND OF CCSANCHEZC 15/02/20197:44
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { defineBase } from '@angular/core/src/render3';
//END OF CCSANCHEZC 15/02/20197:44
@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  createPefil(data: { nombre: string, apellido: string, celular: number, edad: number, genero: string, nacionalidad: string, text: string }) {
    console.log(this.getIud());
    return this.db.collection('perfil').doc(this.getIud()).set(data);
  }

  updatePerfil(documentId: string, data: any) {
    return this.db.collection('perfil').doc(documentId).set(data);
  }

  public getPerfil(documentId: string) {
    return this.db.collection('perfil').doc(documentId).snapshotChanges();
  }

  public getPerfiles() {
    return this.db.collection('perfil').snapshotChanges();
  }
}

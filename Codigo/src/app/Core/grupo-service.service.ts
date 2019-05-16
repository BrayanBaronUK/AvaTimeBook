import { Injectable, KeyValueDiffers } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../Core/auth.service';
import * as firebase from 'firebase/app';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class GrupoServiceService {
  public grupo: any;
  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth) { }
  getIud() {
    return firebase.auth().currentUser.uid;
  }
  createGrupo(data: {nombre_grupo: String, grupo:any}) {
    console.log(data);
    return this.db.collection('perfil').doc(this.getIud()).collection('Grupo').add(data);
  }
  getGrupos() {
    return this.db.collection('perfil').doc(this.getIud()).collection('grupo-creado').
      doc(this.getIud()).collection('grupo').snapshotChanges();
  }
}

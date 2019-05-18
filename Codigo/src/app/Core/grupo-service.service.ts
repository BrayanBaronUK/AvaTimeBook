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
  createGrupo(nombre_grupo: String, data: {}, uid: any) {
    console.log(data);
    return this.db.collection('perfil').doc(this.getIud()).collection('Grupo').add({
      nombre_grupo,
      data,
      uid
    });
  }
<<<<<<< HEAD
  createGrupoOtro(nombre_grupo: String, data: {}, id: any) {
    console.log(data);
    return this.db.collection('perfil').doc(id).collection('Grupo').doc(this.getIud()).set({
      nombre_grupo,
      data
    });
  }
  createGrupoSegudor(nombre_grupo: String, data: {}, id: any) {
=======
  createGrupoSegudor(nombre_grupo: String, data: {}, id: any, uid: any) {
>>>>>>> cesar
    console.log(data);
    return this.db.collection('perfil').doc(id).collection('Grupo').add({
      nombre_grupo,
      data,
      uid
    });
  }

  getGrupos() {
    return this.db.collection('perfil').doc(this.getIud()).collection('Grupo').snapshotChanges();
  }
  eliminarGrupo(id) {
    return this.db.collection('perfil').doc(this.getIud()).collection('Grupo').doc(id).delete();
  }
  ActualizarGrupo(id, nombre_grupo: String, data: {}, uid: any) {
    this.eliminarGrupo(id);
    this.createGrupo(nombre_grupo, data, uid);
  }
}

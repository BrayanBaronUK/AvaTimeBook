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
  createGrupo(nombre_grupo: String, data: {}) {
    console.log(data);
    return this.db.collection('perfil').doc(this.getIud()).collection('Grupo').doc(this.getIud()).set({
      nombre_grupo,
      data
    });
  }
  createGrupoOtro(nombre_grupo: String, data: {}, id: any) {
    console.log(data);
    return this.db.collection('perfil').doc(id).collection('Grupo').doc(this.getIud()).set({
      nombre_grupo,
      data
    });
  }
  createGrupoSegudor(nombre_grupo: String, data: {}, id: any) {
    console.log(data);
    return this.db.collection('perfil').doc(id).collection('GrupoConMiSeguidor').doc(this.getIud()).set({
      nombre_grupo,
      data
    });
  }
  getGrupos() {
    return this.db.collection('perfil').doc(this.getIud()).collection('Grupo').snapshotChanges();
  }
  eliminarGrupo(id) {
    return this.db.collection('perfil').doc(this.getIud()).collection('Grupo').doc(id).delete();
  }
  ActualizarGrupo(id, nombre_grupo: String, data: {}) {
    this.eliminarGrupo(id);
    this.createGrupo(nombre_grupo, data);
  }
}

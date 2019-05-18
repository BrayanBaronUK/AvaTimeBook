import { Injectable, KeyValueDiffers } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService} from '../Core/auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ServicioFiltroPersonaService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public auth: AuthService
  ) { }

  getIud() {
    if (this.auth.getAuth) {
      return firebase.auth().currentUser.uid;
    }
  }
   getPerfiles() {
    return this.db.collection('perfil').snapshotChanges();
  }

  getSeguidores() {
    return this.db.collection('perfil').doc(this.getIud()).collection('SeguidorPersona').snapshotChanges();
  }
}

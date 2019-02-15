import { Component } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items : Observable<any[]>;
  contactos : Observable<any[]>;
  constructor(db: AngularFirestore){
    this.items =db.collection('items').valueChanges();
    this.contactos =db.collection('contactos').valueChanges();
  }
}

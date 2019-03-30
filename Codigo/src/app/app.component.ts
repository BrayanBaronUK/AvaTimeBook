import { Component } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(db: AngularFirestore) {
  }

  Obtener() {
     // tslint:disable-next-line:no-debugger
     debugger;
     return document.getElementById('container').style.display = 'none';
  }

  Resetear () {
    return document.getElementById('container').style.display = 'block';
  }
}

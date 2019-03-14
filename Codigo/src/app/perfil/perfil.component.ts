import { Component, OnInit } from '@angular/core';
import { UserService } from '../Core/user.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  private foto: string;
  userFirebase
  constructor(
    public UserServices: UserService,
    private _storage: AngularFireStorage
  ) {
    //this.foto = this.userFirebase.nombre;
  }


  ngOnInit() {
    this.userFirebase = {
      nombre: "",
      apellido: "",
      genero: "",
      edad: "",
      url: "",
      celular: "",
      nacionalidad: "",
      text: "",
      nombre_libro: "",
      autor_libro: "",
      text_libro: "",
      url_libro: ""
    }
    this.UserServices.getPerfil().valueChanges().subscribe((user) => {
      console.log(this.userFirebase = user)

    });
    console.log(this.userFirebase)
  }


  subirFoto($event: any) {

    let fileReader = new FileReader();
    //let ruta= fileReader.readAsDataURL($event.target.files[0])
    //  console.log("rtua", ruta)
    // this.foto= ruta;
    fileReader.onload = ($event: any) => {
      this.foto = $event.target.result;

<<<<<<< HEAD
    }
    fileReader.readAsDataURL($event.target.files[0])
=======
  let fileReader = new FileReader();
  //let ruta= fileReader.readAsDataURL($event.target.files[0])//
 //   console.log("rtua", ruta)//
  //this.foto= ruta;
  fileReader.onload = ($event: any) => {
    this.foto = $event.target.result;
>>>>>>> brayan


    // let nombreFoto= $event.target.files[0].name;
  }
  upload(event) {
    // Get input file
    const file = event.target.files[0];

    // Generate a random ID
    const randomId = Math.random().toString(36).substring(2);
    console.log(randomId);
    const filepath = `/${randomId}`;

<<<<<<< HEAD
    const fileRef = this._storage.ref(filepath);

    // Upload image
    const task = this._storage.upload(filepath, file);

    // Observe percentage changes
    this.uploadProgress = task.percentageChanges();

    // Get notified when the download URL is available
    task.snapshotChanges().pipe(
      (() => this.uploadURL = fileRef.getDownloadURL())
    ).subscribe();
  }
=======
  //let nombreFoto= $event.target.files[0].name;//
}
>>>>>>> brayan


}

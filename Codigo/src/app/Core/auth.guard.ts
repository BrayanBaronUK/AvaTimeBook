import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import {AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from '../Core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public a: String= "1";
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    
  ) {}

  public getParameto(){
    return this.a;
  }
  public setParametro(value){
    this.a = value;
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.afAuth.authState
     .take(1)
      .map(authState => !! authState)
      .do( authenticated => {
         if (!authenticated) {
           this.router.navigate(['/login']);
           
         }else if( this.a == "1"){
        //  this.router.navigate(['/form-person']);

         }
     });
  }
   
}

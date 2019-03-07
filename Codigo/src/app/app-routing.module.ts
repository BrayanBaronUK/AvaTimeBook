import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { RegisterComponent } from '../app/register/register.component';
import { UserComponent } from '../app/user/user.component';
import { AuthGuard } from '../app/Core/auth.guard';
import { NotFoundComponent } from '../app/not-found/not-found.component';
import { HomePageComponent } from '../app/home-page/home-page.component';
import { SocialPageComponent } from '../app/social-page/social-page.component';
import { ForgotPasswordComponent } from '../app/forgot-password/forgot-password.component';
import { FormPersonComponent } from '../app/form-person/form-person.component';
import { PerfilComponent } from '../app/perfil/perfil.component';


const routes: Routes = [];
//BEGIN OF CCSANCHEZC 15/02/2019 7:29
export const rootRouterConfig: Routes = [
  //{ path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: HomePageComponent,},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'user', component: UserComponent,  resolve: { data: UserResolver }}
  { path: 'user', component: UserComponent },
  { path: 'social', component: SocialPageComponent },//,canActivate: [AuthGuard] 
  { path: 'forgot', component: ForgotPasswordComponent},
  { path: 'form-person', component: FormPersonComponent},
  { path: 'perfil', component: PerfilComponent,},
  { path: '**', component: NotFoundComponent },

];
//END OF CCSANCHEZC 15/02/2019 7:29
@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

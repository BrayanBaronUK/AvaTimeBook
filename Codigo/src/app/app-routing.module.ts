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
import { LibrosComponent } from '../app/libros/libros.component';
import { CrearLibroComponent } from '../app/crear-libro/crear-libro.component';
import { ChatComponent } from './chat/chat.component';
import { GruposComponent} from './grupos/grupos.component';
import { RoomComponent} from './room/room.component';
import {TablaLibrosComponent} from './tabla-libros/tabla-libros.component'
import { FiltroPersonComponent} from './filtro-person/filtro-person.component';
const routes: Routes = [];
// BEGIN OF CCSANCHEZC 15/02/2019 7:29
export const rootRouterConfig: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: HomePageComponent, },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'user', component: UserComponent,  resolve: { data: UserResolver }}
  { path: 'user', component: UserComponent },
  { path: 'social', component: SocialPageComponent, canActivate: [AuthGuard] },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'form-person', component: FormPersonComponent, canActivate: [AuthGuard] },
  { path: 'crearlibro', component: CrearLibroComponent, canActivate: [AuthGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'libros', component: LibrosComponent, canActivate: [AuthGuard] },
  { path: 'filtropersona', component: FiltroPersonComponent, canActivate: [AuthGuard] },
  { path: 'grupos', component: GruposComponent, canActivate: [AuthGuard]},
  { path: 'sala', component: RoomComponent, canActivate: [AuthGuard] },
  { path: 'TablaLibros', component: TablaLibrosComponent, canActivate: [AuthGuard]},
  { path: '**', component: NotFoundComponent }
];
// END OF CCSANCHEZC 15/02/2019 7:29
@NgModule({
  imports: [RouterModule.forRoot(rootRouterConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatSelectModule,
  MatOptionModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatColumnDef,
  MatProgressBarModule,
  MatSortModule,
  MatFormFieldModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './Core/auth.service';
import { AuthGuard } from './Core/auth.guard';
import { SocialPageComponent } from './social-page/social-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormPersonComponent } from './form-person/form-person.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LibrosComponent } from './libros/libros.component';
import { CrearLibroComponent } from './crear-libro/crear-libro.component';
import * as $ from 'jquery';
import { FilterPipe } from './filter/filter.pipe';
import { MatTabsModule } from '@angular/material';
import { ChatComponent } from './chat/chat.component';
import { GruposComponent } from './grupos/grupos.component';
import { EventosComponent } from './eventos/eventos.component';
import { FiltroPersonComponent } from './filtro-person/filtro-person.component';
import { ChatService } from './Core/chat.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NavbarComponent,
    NotFoundComponent,
    HomePageComponent,
    SocialPageComponent,
    ForgotPasswordComponent,
    FormPersonComponent,
    PerfilComponent,
    LibrosComponent,
    CrearLibroComponent,
    FilterPipe,
    ChatComponent,
    GruposComponent,
    EventosComponent,
    FiltroPersonComponent,
    ChatService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
    AngularFireStorageModule,
    MatGridListModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressBarModule,
    MatSortModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }

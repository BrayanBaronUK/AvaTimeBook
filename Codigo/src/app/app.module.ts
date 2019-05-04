import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
//import { PickerModule } from '@ctrl/ngx-emoji-mart'//Agregar emojis camilo
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
import 'rxjs/add/operator/map';
import { FiltroPersonComponent } from './filtro-person/filtro-person.component';
import { ChatService } from './Core/chat.service';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
//import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
//import { EmojiModule } from 'angular-emojione';
import {ProgressBarModule} from 'primeng/progressbar';
import {GalleriaModule} from 'primeng/galleria';
import {ListboxModule} from 'primeng/listbox';
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
    FiltroPersonComponent
  ],
  imports: [
    AccordionModule,//union
    BrowserModule,
    PanelModule,
    DialogModule,
    CalendarModule,
    TableModule,
   // PickerModule,//Agregar emojis camilo
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    FormsModule,
    FlashMessagesModule,
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
    MatIconModule,
//   EmojiModule,
    ProgressBarModule,
    GalleriaModule,
    ListboxModule
  ],
  providers: [AuthService, AuthGuard, FlashMessagesService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }

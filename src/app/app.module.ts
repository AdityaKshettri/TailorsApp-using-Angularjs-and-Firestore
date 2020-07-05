import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TailorsComponent } from './components/tailors/tailors.component';
import { AddTailorComponent } from './components/add-tailor/add-tailor.component';
import { EditTailorComponent } from './components/edit-tailor/edit-tailor.component';
import { TailorComponent } from './components/tailor/tailor.component';
import { TailorDetailsComponent } from './components/tailor-details/tailor-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { AuthService } from './services/auth.service';
import { TailorService } from './services/tailor.service';
import { TailorDetailComponent } from './components/tailor-detail/tailor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TailorsComponent,
    AddTailorComponent,
    TailorDetailsComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    EditTailorComponent,
    TailorComponent,
    TailorDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'tailors-app'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [
    AuthService,
    TailorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

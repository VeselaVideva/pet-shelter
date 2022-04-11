import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCardModule } from "@angular/material/card";

import { HotToastModule } from '@ngneat/hot-toast';
import { ShareModule } from "ngx-sharebuttons";
import { ShareIconsModule } from "ngx-sharebuttons/icons";

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from "@angular/fire/storage";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NetworkInterceptor } from "./interceptors/network.interceptor";

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { DetailsComponent } from './components/details/details.component';
import { ScrollComponent } from './components/scroll/scroll.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    AddPetComponent,
    ProfileComponent,
    PagenotfoundComponent,
    DetailsComponent,
    ScrollComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    HotToastModule.forRoot(),
    FormsModule,
    ShareModule,
    ShareIconsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: NetworkInterceptor,
    multi: true
  }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

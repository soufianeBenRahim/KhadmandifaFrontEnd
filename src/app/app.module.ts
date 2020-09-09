import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { ProfileComponent } from './profile/profile.component';

import { AuthService } from './_services/auth.service';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AuthInterceptor } from './_helpers/auth.interceptor';
import { DeplomeComponent } from './deplome/deplome.component';
import { ExperianceComponent } from './experiance/experiance.component';
import { CompitanceComponent } from './compitance/compitance.component';
import { CVComponent } from './cv/cv.component';
import { EtatCivilComponent } from './etat-civil/etat-civil.component';
import { ProjetComponent } from './projet/projet.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { UpdateCVComponent } from './update-cv/update-cv.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ProfileComponent,
    DeplomeComponent,
    ExperianceComponent,
    CompitanceComponent,
    CVComponent,
    EtatCivilComponent,
    ProjetComponent,
    UpdateProjectComponent,
    UpdateCVComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
   { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
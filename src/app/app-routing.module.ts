import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './_helpers/Auth.guard ';
import { CVComponent } from './cv/cv.component';
import { ProjetComponent } from './projet/projet.component';
import { UpdateDemandeRealisationComponent } from './update-demande-realisation/update-demande-realisation.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate : [AuthGuard]  },
  { path: 'CV/:id', component: CVComponent , canActivate : [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id/:typeappel', component: ProfileComponent, canActivate : [AuthGuard] },
  { path: 'profile/:id/:typeappel/:idProjet/:iddemmande', component: ProfileComponent, canActivate : [AuthGuard] },
  { path: 'user', component: BoardUserComponent , canActivate : [AuthGuard]},
  { path: 'admin', component: BoardAdminComponent , canActivate : [AuthGuard]},
  { path: 'project/:mode', component: ProjetComponent },
  { path: 'demande/add/:idProjet', component: UpdateDemandeRealisationComponent },
  { path: 'demande/:id', component: UpdateDemandeRealisationComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
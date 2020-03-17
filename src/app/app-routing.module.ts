import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { AuthGuard } from './_helpers/Auth.guard ';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate : [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard] },
  { path: 'user', component: BoardUserComponent , canActivate : [AuthGuard]},
  { path: 'admin', component: BoardAdminComponent , canActivate : [AuthGuard]},
  { path: 'admin', component: BoardAdminComponent , canActivate : [AuthGuard]},
  { path: '**', redirectTo: 'home', pathMatch: 'full' , canActivate: [AuthGuard]},
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
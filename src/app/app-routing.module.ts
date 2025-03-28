import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ProfilComponent } from './profil/profil.component';
import { InfoComponent } from './info/info.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AdminComponent } from './admin/admin.component';
import { adminGuard } from './admin.guard';
import { authGuard } from './auth.guard';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'profil', component: ProfilComponent, canActivate: [authGuard]},
  {path: 'services', component: InfoComponent},
  {path: 'reservations', component: ReservationsComponent, canActivate: [authGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [adminGuard]},
  {path: 'reset-password/:token', component: ResetPasswordComponent},
  {path: '', redirectTo : 'home', pathMatch: 'full'},
  {path: '**', redirectTo : 'home', pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

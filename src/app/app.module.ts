import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';
import { ProfilComponent } from './profil/profil.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { HourFormatPipe } from './hour-format.pipe';
import { AdminComponent } from './admin/admin.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,

    ContactComponent,
    ProfilComponent,
    ReservationsComponent,
    HourFormatPipe,
    AdminComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule
    
  ],
  providers: [
    provideHttpClient(),
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

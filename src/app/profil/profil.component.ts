import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-profil',
  standalone: false,
  
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  loggedUser:any
  constructor(private auth:AuthService) {}
}

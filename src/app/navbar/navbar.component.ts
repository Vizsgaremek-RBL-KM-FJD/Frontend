import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy { 
  loggedUser:any=null;
  isAdmin?:boolean;
  feliratkozas?:Subscription;
  constructor(private auth:AuthService){ }

  // ngOnInit(): void {
  //   this.feliratkozas=this.auth.getLoggedUser().subscribe(
  //     (user)=>this.loggedUser=user
  //   )
  // }
  
  ngOnInit(): void {
    
    this.feliratkozas = this.auth.getLoggedUser().subscribe(
      (user) => {
        this.loggedUser = user;
        if (user) {
          this.isAdmin = user.isAdmin; // Ha van ilyen mező az API válaszában
        } else {
          this.isAdmin = false;
        }
      }
    );

    this.auth.isAdmin$.subscribe(
      (isAdmin) => this.isAdmin = isAdmin
    );
  
  }

  

  ngOnDestroy(): void {
    this.feliratkozas?.unsubscribe();
  }

  logout(){
    console.log("Kilép")
    if (this.feliratkozas) {
      this.feliratkozas.unsubscribe();
    }
    this.auth.logout()
  }

}

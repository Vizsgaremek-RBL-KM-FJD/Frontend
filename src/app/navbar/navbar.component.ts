import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

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
    // Ellenőrizd a LocalStorage-t
    const userFromStorage = localStorage.getItem('loggedUser');
    if (userFromStorage) {
      this.loggedUser = JSON.parse(userFromStorage);
    }
  
    // Feliratkozás az AuthService-re
    this.feliratkozas = this.auth.getLoggedUser().subscribe(
      (user) => this.loggedUser = user
    );
  
    // Check if user is admin
    this.auth.isAdmin().subscribe((response: any) => {
      this.isAdmin = response;
    });
  }

  

  ngOnDestroy(): void {
    if (this.feliratkozas) this.feliratkozas.unsubscribe()    
    this.feliratkozas?.unsubscribe()    
  }

  logout(){
    console.log("Kilép")
    if (this.loggedUser) this.auth.logout()
  }

}

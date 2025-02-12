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

  loggedUser:any=null
  feliratkozas?:Subscription
  constructor(private auth:AuthService){   
  }

  ngOnInit(): void {
    this.feliratkozas=this.auth.getLoggedUser().subscribe(
      (user)=>this.loggedUser=user
    )
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

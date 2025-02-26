import { Component, HostListener } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
  showBackToTop = false;
 
  
  

  constructor(private auth:AuthService){
    
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 100; 

  
    
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  
  
}

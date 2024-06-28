import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent {
  
  /*constructor(private router: Router) {}

  @HostListener('window:beforeunload', ['$event'])
  redirectToHome(event: Event): void {
    event.preventDefault();
    
    this.router.navigate(['/home']);
  }*/
}

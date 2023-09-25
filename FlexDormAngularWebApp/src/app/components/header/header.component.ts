import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavListHidden = false;

  toggleNavList() {
    this.isNavListHidden = !this.isNavListHidden;
  }


  isLoginPage: boolean = false;

  constructor(private router: Router, private authService:AuthService) {
    // Suscribirse a eventos de cambio de ruta
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificar si estamos en la página de 'login'
        this.isLoginPage = event.url === '/login';
        this.isLoginPage = event.url === '/register';
      }
    });
  }
  logout(){
    this.authService.logout();
  }

}

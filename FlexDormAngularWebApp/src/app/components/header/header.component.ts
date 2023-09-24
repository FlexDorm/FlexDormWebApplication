import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';

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

  constructor(private router: Router) {
    // Suscribirse a eventos de cambio de ruta
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificar si estamos en la página de 'login'
        this.isLoginPage = event.url === '/login';
      }
    });
  }

}

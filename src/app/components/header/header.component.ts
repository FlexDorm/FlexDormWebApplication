import { Component } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AccountData } from 'src/typings';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavListHidden = false;
  userData: AccountData = {} as AccountData;

  toggleNavList() {
    this.isNavListHidden = !this.isNavListHidden;
  }

  isLoginPage: boolean = false;

  constructor(private router: Router, private authService:AuthService, private profileService:ProfileService) {
    const type=localStorage.getItem('type')
    switch(type){
      case 'student':
        this.studentNav=true;
        this.arrenderNav=false;
      break;
      case 'arrender':
        this.arrenderNav=true;
        this.studentNav=false;
        break;

    }
    // Suscribirse a eventos de cambio de ruta
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificar si estamos en la página de 'login'
        this.getAccountData((localStorage.getItem('userId')));
        this.isLoginPage = event.url === '/login' || event.url === '/register';
      }
    });
  }

  studentNav=false;
  arrenderNav=false;

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout();
  }

  getAccountData(id: any) {
    this.profileService.getAccountData(id).subscribe(
      {
        next: (response:any) => {
          this.userData = response;
          console.log(this.userData);
        },
        error: (error) => {
          console.error('Error al obtener los datos del perfil:', error);
        },
      }
    );
  }

}

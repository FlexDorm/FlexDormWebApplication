import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  loginError: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.email, this.password)
      .then(success => {
        if (success) {
          // Redirigir al usuario después de iniciar sesión
          this.router.navigate(['/dashboard']); // Cambia '/dashboard' por la ruta que desees
        } else {
          // Mostrar mensaje de error
          this.loginError = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        }
      })
      .catch(error => {
        console.error('Error en el inicio de sesión:', error);
        this.loginError = 'Se produjo un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
      });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<boolean> {
    const loginUrl = `http://localhost:3000/accounts?email=${email}&password=${password}`;

    return this.http.get<Account[]>(loginUrl)
      .toPromise()
      .then(accounts => {
        // Verificar si se encontró una cuenta que coincida con las credenciales
        const matchingAccount = accounts?.find(account => account.email === email && account.password === password);

        if (matchingAccount) {
          // Las credenciales coinciden para el mismo registro
          // Puedes realizar cualquier validación adicional aquí
          localStorage.setItem('userId', matchingAccount.id.toString());
          this.loggedIn = true;

          return true;
        } else {
          this.loggedIn = false;
          return false;
        }
      })
      .catch(error => {
        console.error('Error en la solicitud HTTP:', error);
        return false;
      });
  }

  logout(): void {
    localStorage.removeItem('userId');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLocalStorage(){

  }
}

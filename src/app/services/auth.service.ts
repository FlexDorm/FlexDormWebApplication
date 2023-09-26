import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from '../models/account.model';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = false;
  private apiUrl = 'https://flexserverjson.onrender.com/account';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<boolean> {
    const loginUrl = `https://flexserverjson.onrender.com/account?email=${email}&password=${password}`;

    return this.http.get<Account[]>(loginUrl)
      .toPromise()
      .then(accounts => {
        // Verificar si se encontró una cuenta que coincida con las credenciales
        const matchingAccount = accounts?.find(account => account.email === email && account.password === password);

        if (matchingAccount) {
          // Las credenciales coinciden para el mismo registro
          // Puedes realizar cualquier validación adicional aquí
          localStorage.setItem('userId', matchingAccount.id.toString());
          localStorage.setItem('type', matchingAccount.type);
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

  register(account: Account): Observable<boolean|string> {
    // Verificar si el correo electrónico ya existe
    return this.http.get<Account[]>(`${this.apiUrl}?email=${account.email}`).pipe(
      switchMap((accounts: Account[]) => {
        const existingAccount = accounts.find((acc) => acc.id !== account.id);
        if (existingAccount) {
          // El correo electrónico ya está registrado en otro ID
          return of('correo existente');
        } else {
          // El correo electrónico no existe en otros ID, procede con el registro
          return this.http.post<Account>(this.apiUrl, account).pipe(
            map((response: Account) => {
              if (response) {
                return true;
              } else {
                return false;
              }
            }),
            catchError((error) => {
              console.error('Error en la solicitud HTTP:', error);
              return of(false);
            })
          );
        }
      }),
      catchError((error) => {
        console.error('Error en la solicitud HTTP:', error);
        return of(false);
      })
    );
  }



  logout(): void {
    localStorage.removeItem('userId');
    localStorage.removeItem('type');
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  setLocalStorage(){

  }
}

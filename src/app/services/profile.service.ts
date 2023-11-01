import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Account } from '../models/account.model';
import { ApiResponse, ApiResponseStatus } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}
  
  handlerError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  getAccountData(id: number) {
    return this.http
    .get(`${environment.baseURL}/account/${id}`)
    .pipe(catchError(this.handlerError));
  }

  getAccountDataFromLocalStorage() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      return JSON.parse(userData) as Account;
    } else {
      return null;
    }
  }

  updateAccountData(accountData: Account){
    const id =  accountData.userId;

    if(accountData.dtype === 'Student'){
      return this.http.put<ApiResponse<Account>>(`${environment.baseURL}/auth/student/${id}`, accountData).pipe(
        map((response) => {
          // Verifica si la respuesta es exitosa
          if (response.status === ApiResponseStatus.Success) {
            // Si las credenciales son correctas, guarda la información del usuario en el localStorage
            const user = response.data;
            localStorage.setItem('userData', JSON.stringify(user));
            return true;
          } else {
            console.error('Error en la solicitud HTTP:', response);
            return false;
          }
        }),
      );

    } else {
      return this.http.put<ApiResponse<Account>>(`${environment.baseURL}/auth/arrender/${id}`, accountData).pipe(
        map((response) => {
          // Verifica si la respuesta es exitosa
          if (response.status === ApiResponseStatus.Success) {
            // Si las credenciales son correctas, guarda la información del usuario en el localStorage
            const user = response.data;
            localStorage.setItem('userData', JSON.stringify(user));
            return true;
          } else {
            console.error('Error en la solicitud HTTP:', response);
            return false;
          }
        }),
      );
    }

  }

}
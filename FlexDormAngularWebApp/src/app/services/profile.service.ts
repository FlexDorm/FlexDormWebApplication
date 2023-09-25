import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AccountData } from 'src/typings';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

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

  updateAccountData(accountData: AccountData): any{
    const id =  accountData.id;
    return this.http.put(`${environment.baseURL}/account/${id}`, accountData);
  }

}
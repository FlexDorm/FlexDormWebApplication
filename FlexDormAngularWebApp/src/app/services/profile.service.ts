import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AccountData
 } from 'src/typings';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {}

  getAccountData() {
    return this.http.get(`${environment.baseURL}/account`);
  }

  updateAccountData(accountData: AccountData): any{
    return this.http.put(`${environment.baseURL}/account`, accountData);
  }

}
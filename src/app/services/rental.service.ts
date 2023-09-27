import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl = environment.baseURL;
  private localUrl='http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerRental(rentalData: any): Observable<any> {
    const url = `${this.baseUrl}/rental`;
    return this.http.post(url, rentalData);
  }

}

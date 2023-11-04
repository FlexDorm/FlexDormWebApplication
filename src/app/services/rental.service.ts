import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError, catchError, tap } from 'rxjs';
import { RentalData } from '../models/rental.models';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private baseUrl = environment.baseURL;
  private localUrl='http://localhost:3000';

  constructor(private http: HttpClient) { }

  handlerError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  registerRental(rentalData: any): Observable<any> {
    const url = `${this.baseUrl}/rental/registerRental`;
    return this.http.post(url, rentalData);
  }

  private handleError(error: any): Observable<any> {
    console.error('Ocurrió un error:', error);
    return throwError(error);
  }
  getRentByStudent(student: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getRentalsByStudentId/${student}`)
      .pipe(catchError(this.handleError));
  }

}

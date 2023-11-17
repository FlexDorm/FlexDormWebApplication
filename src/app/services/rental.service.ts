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

  getMovimentByStudent(student: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getMovimentByStudentId/${student}`)
      .pipe(catchError(this.handleError));
  }

  getRentByArrender(arrenderId: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getRentalsByArrenderId/${arrenderId}`)
      .pipe(catchError(this.handleError));
  }
  getMovimentByArrender(arrenderId: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/getMovimentByArrenderId/${arrenderId}`)
      .pipe(catchError(this.handleError));
  }

  toggleFavorite(reservationId: string): Observable<ApiResponse<RentalData[]>> {
    const requestBody = {};
    return this.http.put<ApiResponse<RentalData[]>>(
      `${this.baseUrl}/rental/${reservationId}/toggleFavorite`,
      requestBody).pipe(
      catchError(this.handleError)
    );
  }

  toggleEndRent(reservationId: string): Observable<ApiResponse<RentalData[]>> {
    const requestBody = {};
    return this.http.put<ApiResponse<RentalData[]>>(
      `${this.baseUrl}/rental/${reservationId}/toggleEndRental`,
      requestBody).pipe(
      catchError(this.handleError)
    );
  }

  getRentByTrueStudent(student: string): Observable<ApiResponse<RentalData[]>> {
    return this.http
      .get<ApiResponse<RentalData[]>>(`${this.baseUrl}/rental/search/${student}`)
      .pipe(catchError(this.handleError));
  }

}

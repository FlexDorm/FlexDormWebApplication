import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError, catchError, tap } from 'rxjs';
import { RoomData } from 'src/typings';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  /**
   * Metodo que se encarga de manejar los errores
   */
  handlerError(error: HttpErrorResponse) {
    return throwError(() => error);
  }

  //observable que notificará la creación de habitaciones
  private roomCreatedSubject = new Subject<void>();
  //método para emitir una notificación de creación de un habitacion
  private onRoomCreated() {
    this.roomCreatedSubject.next();
  }
  //observable que los componentes pueden suscribirse para detectar la creación de una habitacion
  roomCreated$ = this.roomCreatedSubject.asObservable();

  /**
   * Obtiene la lista de habitaciones (GET)
   */
  getRoomsList() {
    return this.http
      .get<RoomData[]>(`${environment.baseURL}/rooms`)
      .pipe(catchError(this.handlerError));
  }
  getRoomsListFree() {
    return this.http
      .get<RoomData[]>(`${environment.baseURL}/rooms?status=free`)
      .pipe(catchError(this.handlerError));
  }

  getRoomsByArrender(arrender: string): Observable<RoomData[]> {
    return this.http
      .get<RoomData[]>(`${environment.baseURL}/rooms?arrender=${arrender}&status=free`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.error('Ocurrió un error:', error);
    return throwError(error);
  }

  /**
   * Registra una nueva habitación (POST)
   * @param pelicula Datos de la habitación a registrar
   */
  registerRoom(roomData: RoomData) {
    console.log('nuevo room', roomData)
    return this.http.post(`${environment.baseURL}/rooms`, roomData).pipe(
      catchError(this.handlerError),
      tap(() => this.onRoomCreated()) //recupera la lista actualizada de habitaciones
    );
  }
}

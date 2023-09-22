import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject, throwError, catchError } from 'rxjs';
import { RoomPost } from 'src/typings';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  constructor(private http: HttpClient) {}

  /**
   * Metodo que se encarga de manejar los errores
   */
  handlerError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(`An error ocurred ${error.status}, body was: ${error.error}`);
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }

    return throwError(
      () =>
        new Error('Something happened with request, please try again later.')
    );
  }

  //observable que notificará la creación de posts
  private postCreatedSubject = new Subject<void>();
  //método para emitir una notificación de creación de un post
  private onPostCreated() {
    this.postCreatedSubject.next();
  }
  //observable que los componentes pueden suscribirse para detectar la creación de un post
  postCreated$ = this.postCreatedSubject.asObservable();

  /**
   * Obtiene la lista de habitaciones (GET)
   */
  getRoomsList() {
    return this.http
      .get<RoomPost[]>(`${environment.baseURL}/posts`)
      .pipe(catchError(this.handlerError));
  }
}

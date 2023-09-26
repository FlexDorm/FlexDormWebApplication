import { Component } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomData } from 'src/typings';
@Component({
  selector: 'app-room-active',
  templateUrl: './room-active.component.html',
  styleUrls: ['./room-active.component.css']
})
export class RoomActiveComponent {
  roomsCards: RoomData[] = [];

  constructor(
    private roomsService: RoomsService,
  ) {
    //se inicializa una suscripción para el observable roomCreated$ (para detectar la creación de habitaciones)
    this.roomsService.roomCreated$.subscribe(() => {
      this.getListOfRooms(); //actualiza la lista de habitaciones cuando se crea una nueva habitación
    });
  }

  /**
   * Este método se ejecuta al iniciar el componente
   */
  ngOnInit(): void {
    const arrender = localStorage.getItem('userId') || '';
    this.getListOfRooms();
  }


  /**
   * Obtiene la lista de habitaciones
   */
  getListOfRooms() {
    this.roomsService.getRoomsListFree().subscribe({
      next: (response) => {
        this.roomsCards = response;
      },
      error: (error) => {
      },
    });
  }
}

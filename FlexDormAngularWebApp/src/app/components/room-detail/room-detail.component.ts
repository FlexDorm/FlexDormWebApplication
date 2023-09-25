import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomData } from 'src/typings';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent  {

  return=false;

  volver(): void {
    this.return = true;
  }

  roomData: RoomData | null = null;

  roomId: number | null = null;

  constructor(private route: ActivatedRoute, private roomsService: RoomsService ) {}

  ngOnInit(): void {
    // Obtiene el valor del parámetro :id de la URL como cadena
    const idParam = this.route.snapshot.paramMap.get('id');

    // Verifica si idParam no es nulo antes de intentar convertirlo en número
    if (idParam !== null) {
      this.roomId = +idParam; // El operador + convierte la cadena en número
    }
    console.log('ddddddddd');
    console.log(this.roomId);

    // Ahora puedes usar this.roomId (de tipo number | null) para obtener los detalles de la habitación
    // Esto depende de cómo tengas configurado tu servicio o fuente de datos

    this.getRoomByID();
  }
  getRoomByID() {
    this.roomsService.getRoomsList().subscribe({
      next: (response) => {
        
        this.roomData = response.find((room) => room.id === this.roomId) ||null;
        console.log(this.roomData);
      }
      
    });
  }

}

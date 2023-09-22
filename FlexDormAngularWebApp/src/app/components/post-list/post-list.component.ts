import { Component } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomPost } from 'src/typings';
type CardContent = {
  title: string;
  description: string;
  imageUrl: string;
};
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  roomsCards: RoomPost[] = [];

  constructor(private roomsService: RoomsService) {}

  /**
   * Este método se ejecuta al iniciar el componente
   */
  ngOnInit(): void {
    this.getListOfRooms();
  }

  /**
   * Obtiene la lista de habitaciones
   */
  getListOfRooms() {
    this.roomsService.getRoomsList().subscribe((response) => {
      this.roomsCards = response;
    });
  }
}

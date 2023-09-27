import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/services/rooms.service';
import { RoomData } from 'src/typings';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from 'src/app/services/rental.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent  {
  rentalData: any = {};
  return=false;
  volver(): void {
    this.return = true;
  }

  roomData: RoomData | null = null;
  finalPriceRoom: number | undefined = undefined;
  roomId: number | null = null;
  constructor(private route: ActivatedRoute, private roomsService: RoomsService, private rentalService:RentalService, private _snackBar:MatSnackBar ) {}

  ngOnInit(): void {

    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null) {
      this.roomId = +idParam;
    }
    console.log('ddddddddd');
    console.log(this.roomId);
    this.getRoomByID();
  }
  getRoomByID() {
    this.roomsService.getRoomsList().subscribe({
      next: (response) => {

        this.roomData = response.find((room) => room.id === this.roomId) ||null;
        console.log(this.roomData);
        this.finalPriceRoom=this.roomData?.price
        console.log(this.finalPriceRoom)
      }

    });
  }

  convertirHoraASegundos(hora: string): number {
    const [horaStr, minutoStr] = hora.split(':');
    const horaInt = parseInt(horaStr, 10);
    const minutoInt = parseInt(minutoStr, 10);
    const segundosHora = horaInt * 3600;
    const segundosMinuto = minutoInt * 60;
    const totalSegundos = segundosHora + segundosMinuto;
    return totalSegundos;
  }

  convertirSegundosAHorasDecimal(segundos: number): number {
    const horasDecimal = segundos / 3600;
    return horasDecimal;
  }

  updateRoomStatus(roomId: any, status: any) {
    this.roomsService.updateRoomStatus(roomId, status).subscribe(
      (response) => {
        console.log('Estado de la habitación actualizado con éxito', response);
      },
      (error) => {
        console.error('Error al actualizar el estado de la habitación', error);
      }
    );
  }


  submitReservation(rentalData: any) {
    const horaSeleccionada = this.rentalData.hourInit;
    const [hora, minuto] = horaSeleccionada.split(':');
    const horaSeleccionada2 = this.rentalData.hourFinal;
    const [hora2, minuto2] = horaSeleccionada.split(':');

    const hourinit= this.convertirHoraASegundos(this.rentalData.hourInit)
    const hourFinal = this.convertirHoraASegundos(this.rentalData.hourFinal)
    const resulthour = this.convertirSegundosAHorasDecimal(hourFinal-hourinit)
    if(minuto !== '00' || minuto2 !== '00')
    {
      this.openSnackBar('Solo podras elegir entre rangos de hora','Ok')
    }else
    if(hourinit>hourFinal)
    {
      this.openSnackBar('La fecha final debe ser mayor a la inicial','Ok')
    }else{
      const studentId=localStorage.getItem('userId')
      this.rentalData.student=studentId,
      this.rentalData.room=this.roomId,
      this.rentalData.finalPrice = (this.finalPriceRoom ?? 0) * resulthour;
      this.updateRoomStatus(this.roomId,'rented' )
      this.rentalService.registerRental(rentalData).subscribe(
        (response) => {
          console.log('Alquiler registrado con éxito:', response);
          this.openSnackBar('Tu renta se registro correctamente', 'Ok')
        },
        (error) => {
          console.error('Error al registrar el alquiler:', error);
        }
      );


    }
  }



    /**
   * Abre la alerta de snackbar
   * @param message Mensaje a mostrar
   * @param action Acción
   */
    openSnackBar(message: string, action?: string) {
      this._snackBar.open(message, action, { duration: 5_000 });
    }
}

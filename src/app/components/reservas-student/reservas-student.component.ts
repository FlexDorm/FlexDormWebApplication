import { Component } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';
import { RentalData } from 'src/app/models/rental.models';
@Component({
  selector: 'app-reservas-student',
  templateUrl: './reservas-student.component.html',
  styleUrls: ['./reservas-student.component.css']
})
export class ReservasStudentComponent {
  rentCards: RentalData[] = [];

  constructor(private rentalService:RentalService){

  }

  ngOnInit(): void {
this.getListOfRooms();
  }

  getListOfRooms() {
    const student = localStorage.getItem('userId') || '';
    this.rentalService.getRentByStudent(student).subscribe({
      next: (response) => {
        this.rentCards = response.data;
      },
      error: (error) => {

      },
    });
  }
}

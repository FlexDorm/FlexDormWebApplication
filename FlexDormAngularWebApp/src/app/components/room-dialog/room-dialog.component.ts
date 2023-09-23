import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomsService } from 'src/app/services/rooms.service';

@Component({
  selector: 'app-room-dialog',
  templateUrl: './room-dialog.component.html',
  styleUrls: ['./room-dialog.component.css'],
})
export class RoomDialogComponent {
  form!: FormGroup;
  universities: string[] = [
    'UPC',
    'PUCP',
    'UTP',
    'UPN',
    'ULIMA',
    'USIL',
    'UNMSM',
  ];

  constructor(
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private roomsService: RoomsService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //inicializa el formulario
    this.form = this.fb.group(
      {
        title: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', [Validators.required, Validators.min(0)]],
        nearUniversities: ['', Validators.required],
        // startDate: ['', Validators.required],
        // endDate: ['', Validators.required],
      }
      // { validator: validateDateRange }
    );
  }

  /**
   * Registra una nueva habitación
   */
  registerRoom() {
    this.roomsService
      .registerRoom({
        id: 0,
        photo: 'https://source.unsplash.com/random/500X500?rooms',
        ...this.form.value,
      })
      .subscribe({
        next: (response) => {
          this.dialogRef.close();
          this.openSnackBar('Habitación registrada', 'Ok');
        },
        error: (error) => {
          this.openSnackBar('Error al registrar habitación', 'Ok');
        },
      });
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

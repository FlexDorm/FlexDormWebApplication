import { Component,Renderer2, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  student = true;
  arrendar = false;
  ngOnInit(): void {
    const miBoton = this.el.nativeElement.querySelector('#studentboton');
    this.renderer.setStyle(miBoton, 'background-color', '#670abe');
    const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
    this.renderer.setStyle(miBoton2, 'color', 'black');
  }

  studentfalse() {
    this.student = true;
    this.arrendar = false;
    const miBoton = this.el.nativeElement.querySelector('#studentboton');
    this.renderer.setStyle(miBoton, 'background-color', '#670abe');
    this.renderer.setStyle(miBoton, 'color', 'white');
    const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
    this.renderer.setStyle(miBoton2, 'background-color', 'white'); // Cambié 'withe' a 'white'
    this.renderer.setStyle(miBoton2, 'color', 'black');
  }

  arrendarfalse() {
    this.arrendar = true;
    this.student = false;
    const miBoton = this.el.nativeElement.querySelector('#studentboton');
    this.renderer.setStyle(miBoton, 'background-color', 'white');
    this.renderer.setStyle(miBoton, 'color', 'black');
    const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
    this.renderer.setStyle(miBoton2, 'background-color', '#670abe');
    this.renderer.setStyle(miBoton2, 'color', 'white');
  }


  selectedDate: Date | undefined;  // Variable para almacenar la fecha seleccionada

  onDateSelected(event: any) {
    this.selectedDate = event.value; // Captura la fecha seleccionada
    console.log('Fecha seleccionada:', this.selectedDate);
    // Aquí puedes realizar acciones adicionales con la fecha seleccionada
  }
}

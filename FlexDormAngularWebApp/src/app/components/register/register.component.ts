import { Component,Renderer2, ElementRef  } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  student = true;
  arrendar =false;
  studentfalse(){
  this.student=true
  this.arrendar=false
  const miBoton = this.el.nativeElement.querySelector('#studentboton');
  this.renderer.setStyle(miBoton, 'background-color', '#670abe');
  const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
  this.renderer.setStyle(miBoton2, 'background-color', 'withe');
  }
  arrendarfalse(){
    this.arrendar=true
    this.student=false
    const miBoton = this.el.nativeElement.querySelector('#studentboton');
    this.renderer.setStyle(miBoton, 'background-color', 'withe');
    const miBoton2 = this.el.nativeElement.querySelector('#arrendarboton');
    this.renderer.setStyle(miBoton2, 'background-color', '#670abe');
  }


}

import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  edit = false;

  editar(): void {
    this.edit = true;
  }

  close(){
    this.edit = false;
  }

}

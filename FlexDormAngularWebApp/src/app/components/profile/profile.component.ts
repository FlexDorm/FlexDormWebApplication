import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { AccountData } from 'src/typings';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  edit = false;
  accountData: AccountData = {} as AccountData;

  constructor(private profileService: ProfileService) {}

  editar(): void {
    this.edit = true;
  }

  close(){
    this.edit = false;
  }

  ngOnInit() {
    this.getAccountData(Number(localStorage.getItem('userId'))); 
  }

  getAccountData(id: number) {
    this.profileService.getAccountData(id).subscribe(
      {
        next: (response:any) => {
          this.accountData = response;
        },
        error: (error) => {
          console.error('Error al obtener los datos del perfil:', error);
        },
      }
    );
  }
  
  updateAccountData(){
    this.profileService.updateAccountData(this.accountData).subscribe(
      (response:any) => {
        console.log('Datos de usuario actualizados', response);
        this.edit = false;
      },
      (error:any) => {
        console.error('Error al guardar los cambios:', error);
      }
    );
  }

}

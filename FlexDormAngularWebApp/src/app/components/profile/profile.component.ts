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
  constructor(private profileService: ProfileService) {}
  accountData: AccountData = {} as AccountData;

  editar(): void {
    this.edit = true;
  }

  close(){
    this.edit = false;
  }

  ngOnInit() {
    this.getAccountData(); // Llamar al método para obtener los datos del perfil al cargar el componente
  }

  getAccountData() {
    this.profileService.getAccountData().subscribe(
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

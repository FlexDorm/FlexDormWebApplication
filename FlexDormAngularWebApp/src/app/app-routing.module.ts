import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { ProfileComponent } from './components/profile/profile.component';

//se definen las rutas de la aplicacion
const routes: Routes = [
  { path:'rooms', component: RoomListComponent },
  { path:'favorites', component: FavoriteListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  { path: '**', redirectTo: '/rooms', pathMatch: 'full' }, //?-> cualquier otra ruta que no este definida, me redirige al /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

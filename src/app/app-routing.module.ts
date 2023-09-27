import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomListComponent } from './components/room-list/room-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RoomDetailComponent } from './components/room-detail/room-detail.component';
import { RoomActiveComponent } from './components/room-active/room-active.component';
import { ReservasStudentComponent } from './components/reservas-student/reservas-student.component';

//se definen las rutas de la aplicacion
const routes: Routes = [
  { path:'rooms', component: RoomListComponent },
  {path:'all-rooms', component:RoomActiveComponent},
  {path:'login',component:LoginComponent},
  {path: 'rental/student', component:ReservasStudentComponent},
  {path:'register',component:RegisterComponent},
  { path: 'all-rooms/:id', component: RoomDetailComponent },
  { path:'favorites', component: FavoriteListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }, //?-> cualquier otra ruta que no este definida, me redirige al /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

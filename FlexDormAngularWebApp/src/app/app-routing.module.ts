import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/post-list/post-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

//se definen las rutas de la aplicacion
const routes: Routes = [
  { path:'posts', component: PostListComponent },
  { path:'favorites', component: FavoriteListComponent },
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: '**', redirectTo: '/posts', pathMatch: 'full' }, //?-> cualquier otra ruta que no este definida, me redirige al /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

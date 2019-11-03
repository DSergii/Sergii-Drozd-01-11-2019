import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './pages/weather/weather.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { PagesComponent } from './pages/pages.component';


const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: '', redirectTo: 'weather', pathMatch: 'full' },
      { path: 'weather', component: WeatherComponent },
      { path: 'weather/:key', component: WeatherComponent },
      { path: 'favorites', component: FavoritesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

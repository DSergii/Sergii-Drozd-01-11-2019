import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherComponent } from './weather/weather.component';
import { HeaderComponent } from './header/header.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { PagesComponent } from './pages.component';
import { AppRoutingModule } from '../app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ForecastComponent } from './weather/forecast/forecast.component';
import { StoreModule } from '@ngrx/store';
import { effects } from './store/effects';
import { EffectsModule } from '@ngrx/effects';
import { locationReducer } from './store/reducers/favorites.reducer';
import { SearchComponent } from './weather/search/search.component';


@NgModule({
  declarations: [
    WeatherComponent,
    FavoritesComponent,
    HeaderComponent,
    PagesComponent,
    ForecastComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgbModule,
    StoreModule.forFeature('locations', locationReducer),
    EffectsModule.forFeature(effects),
  ]
})
export class PagesModule { }

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromFavorites from '../store/reducers/favorites.reducer';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

/**
 * models
 */
import {Location} from '../models/location.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  public favorites$: Observable<Location[]>;

  constructor(
    private store: Store<fromFavorites.AppState>,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.favorites$ = this.store.pipe(select(fromFavorites.getFavorites));
  }

  showDailyForecast(key: number): void {
    this.router.navigate(['/weather', key]);
  }

}

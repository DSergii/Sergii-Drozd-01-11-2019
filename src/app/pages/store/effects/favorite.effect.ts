import { Injectable } from '@angular/core';
import { Effect, Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/internal/operators';
import { CommonService } from '../../services/common.service';
import { Observable, of } from 'rxjs';
import * as favoriteActions from '../actions/favorite.action';

/**
 * models
 */
import {Location} from '../../models/location.model';

@Injectable()
export class FavoriteEffect {

  constructor(
    private actions$: Actions,
    private commonSrv: CommonService
  ) {}

  /**
   * mock for work with backend
   * @type {Observable<ObservedValueOf<Observable<any>>>}
   */
  @Effect()
  addtoFavorite$ = createEffect(() =>
    this.actions$.pipe(
      ofType<favoriteActions.AddToFavorite>(
        favoriteActions.FavoriteActionTypes.ADD_TO_FAVORITE
      ),
      map((action: favoriteActions.AddToFavorite) => action.payload),
      mergeMap((location: Location) =>
        this.commonSrv.addToFavoriteMock(location).pipe(
          map(
            (newLocation: Location) => new favoriteActions.AddToFavoriteSuccess(newLocation)
          ),
          catchError(err => of(new favoriteActions.AddToFavoriteFail(err)))
        )
      )
    )
  );
}

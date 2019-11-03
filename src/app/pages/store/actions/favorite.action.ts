import { Action } from '@ngrx/store';
import { Location } from '../../models/location.model';


export enum FavoriteActionTypes {
  LOAD_FAVORITE = "[Locations] Load Locations",
  ADD_TO_FAVORITE = '[Locations] Add to Favorite',
  ADD_TO_FAVORITE_SUCCESS = '[Locations] Add to Favorite Success',
  ADD_TO_FAVORITE_FAIL = '[Locations] Add to Favorite Fail',
  REMOVE_FROM_FAVORITE = '[Locations] Remove from Favorite',
}

export class LoadFavorite implements Action {
  readonly type = FavoriteActionTypes.LOAD_FAVORITE;
  constructor(public payload: number) {}
}

export class AddToFavorite implements Action {
  readonly type = FavoriteActionTypes.ADD_TO_FAVORITE;
  constructor(public payload: Location) {}
}

export class AddToFavoriteSuccess implements Action {
  readonly type = FavoriteActionTypes.ADD_TO_FAVORITE_SUCCESS;
  constructor(public payload: Location) {}
}

export class AddToFavoriteFail implements Action {
  readonly type = FavoriteActionTypes.ADD_TO_FAVORITE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveFromFavorite implements Action {
  readonly type = FavoriteActionTypes.REMOVE_FROM_FAVORITE;
  constructor(public payload: number) { }
}

export type FavoriteAction =
  | LoadFavorite
  | AddToFavorite
  | AddToFavoriteSuccess
  | AddToFavoriteFail
  | RemoveFromFavorite

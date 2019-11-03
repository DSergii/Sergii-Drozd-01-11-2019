import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromFavorite from './favorites.reducer';
import { AppState } from './favorites.reducer';

export const reducers: ActionReducerMap<AppState> = {
  locations: fromFavorite.locationReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [logger];
import * as favoriteActions from '../actions/favorite.action';
import { Location } from '../../models/location.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../../state/app-state';

export interface LocationState extends EntityState<Location> {
  selectedLocationId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export interface AppState extends fromRoot.AppState {
  locations: LocationState;
}

export const favoriteAdapter: EntityAdapter<Location> = createEntityAdapter<Location>();

export const defaultLocation: LocationState = {
  ids: [],
  entities: {},
  selectedLocationId: null,
  loading: false,
  loaded: false,
  error: ''
};

export const initialState = favoriteAdapter.getInitialState(defaultLocation);

export function locationReducer (
  state = initialState,
  action: favoriteActions.FavoriteAction
) {

  switch(action.type) {

    case favoriteActions.FavoriteActionTypes.ADD_TO_FAVORITE_SUCCESS: {
      return favoriteAdapter.addOne(action.payload, state);
    }

    case favoriteActions.FavoriteActionTypes.ADD_TO_FAVORITE_FAIL: {
      return {
        ...state
      }
    }

    case favoriteActions.FavoriteActionTypes.LOAD_FAVORITE: {
      return {
        ...state,
        selectedLocationId: action.payload
      }
    }

    case favoriteActions.FavoriteActionTypes.REMOVE_FROM_FAVORITE: {
      return favoriteAdapter.removeOne(action.payload, state);
    }

  }

  return state;
}

export const getFavoriteLocationState = createFeatureSelector<LocationState>('locations');

export const getFavorites = createSelector(
  getFavoriteLocationState,
  favoriteAdapter.getSelectors().selectAll
);

export const getCurrentFavoruteId = createSelector(
  getFavoriteLocationState,
  (state: LocationState) => state.selectedLocationId
);
export const getCurrentFavorite = createSelector(
  getFavoriteLocationState,
  getCurrentFavoruteId,
  state => state.entities[state.selectedLocationId]
);
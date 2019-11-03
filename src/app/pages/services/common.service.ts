import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/internal/operators';

/**
 * models
 */
import {SingleForecast} from '../models/single-forecast.model';
import {Location} from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private BASE_URL: string = environment.BASE_URL;
  private API_KEY: string = environment.API_KEY;

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * get forecast for single location
   * @param {string} key
   * @returns {Observable<any>}
   */
  getCurrentWeather(key: string): Observable<any> {
    return this.http
      .get<SingleForecast[]>(`${this.BASE_URL}/currentconditions/v1/${key}?apikey=${this.API_KEY}&language=en-us`);
  }

  /**
   * get daily forecast, by default for 5 days
   * @param {string} locationKey
   * @returns {Observable<any>}
   */
  dailyForecast(locationKey: string|number): Observable<any> {
    return this.http.get(`${this.BASE_URL}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.API_KEY}&language=en-us`);
  }

  /**
   * search by term from search field
   * @param {Observable<string>} terms
   * @returns Observable with backend response or Observable with empty array
   */
  search(terms: Observable<string>) {
    return terms
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap( term => {
          if(term) {
            return this.searchLocation(term).pipe(
              catchError(err => of(err))
            )
          }
          return of([]);
        })
      );
  }

  searchLocation(term): Observable<any> {
    return this.http.get(`${this.BASE_URL}/locations/v1/cities/autocomplete?apikey=${this.API_KEY}&q=${term}&language=en-us`);
  }

  addToFavoriteMock(payload: Location): Observable<any> {
    return of(payload);
  }

  /**
   * get current position
   * @returns {Promise<any>}
   */
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }

  /**
   * get geo info
   * @param {string} latlong
   * @returns {Observable<any>}
   */
  geopositionSearch(latlong: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/locations/v1/cities/geoposition/search?apikey=${this.API_KEY}&q=${latlong}&language=en-us`);
  }

}

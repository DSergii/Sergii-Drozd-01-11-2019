import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { showAnimation } from '../../../animations';
import { CommonService } from '../../services/common.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { first, switchMap } from 'rxjs/internal/operators';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import * as favoriteActions from "../../store/actions/favorite.action";
import * as fromFavorite from '../../store/reducers/favorites.reducer';

/**
 * models
 */
import {Forecast} from '../../models/forecast.model';
import {SingleForecast} from '../../models/single-forecast.model';
import {Location} from '../../models/location.model';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
  animations: [showAnimation]
})
export class ForecastComponent implements OnInit, OnChanges {

  @Input() forecast: Forecast;
  private TEL_AVIV_KEY: string = '215854';

  public defaultLocation: SingleForecast;
  public favoriteLocation: {id: number|null, name: string} = {id: null, name: ''};

  constructor(
    private commonSrv: CommonService,
    private store: Store<fromFavorite.AppState>,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {

    /**
     * get forecast for current geo position
     * by default get forecast for Tel Aviv
     */
    this.getLocation();

    const locationKey: number = this.route.snapshot.params.key;

    if(locationKey) {
      this.store.dispatch(new favoriteActions.LoadFavorite(locationKey));

      const location$: Observable<Location| Location[]> = this.store.select(fromFavorite.getCurrentFavorite);

      location$
        .pipe(first())
        .subscribe(currLocation => {

          if(currLocation) {
            this.favoriteLocation.id = currLocation['id'];
            this.favoriteLocation.name = currLocation['name'];
            this.getDailyForecast(this.favoriteLocation);
          } else {
            this.getDailyForecast({id: locationKey, name: ''});
          }
        });
    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.forecast.currentValue) {
      if(changes.forecast.currentValue) {
        this.forecast = changes.forecast.currentValue;
      }
    }
  }

  getLocation(): void {
    const success = (position) => {
      let localizedName = '';
      const latlong = position.coords.latitude + ',' + position.coords.longitude;
      this.commonSrv.geopositionSearch(latlong)
        .pipe(
          switchMap(geodata => {
            localizedName = geodata.LocalizedName;
            return this.commonSrv.getCurrentWeather(geodata.Key)
          })
        )
        .subscribe( (response: Array<SingleForecast>) => {
          this.defaultLocation = {...response[0], ...{LocalizedName: localizedName}};
        }, error => {
          this.toastr.error('Some error has occurred');
        });
    };
    const error = () => {
      this.commonSrv.getCurrentWeather(this.TEL_AVIV_KEY)
        .subscribe( (response: Array<SingleForecast>) => {
          this.defaultLocation = {...response[0], ...{LocalizedName: 'Tel Aviv'}};
        });
      this.toastr.error('Geolocation is forbidden');
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }

  getDailyForecast(location: {id: string|number, name: string}): void {
    this.commonSrv.dailyForecast(location['id'])
      .subscribe( (response: Forecast) => {
        this.forecast = {...response, ...{id: location['id'], name: location['name']}};
      }, error => {
        this.toastr.error('Some error has occurred');
      });
  }

  addToFavorite(location: Forecast): void {
    const body: Location = {
      id: location['id'],
      name: location['name'],
      temperature: location.DailyForecasts[0].Temperature.Maximum.Value,
      icon: location.DailyForecasts[0].Day.Icon,
      iconPhase: location.DailyForecasts[0].Day.IconPhrase,
      precipitationType: location.DailyForecasts[0].Day.PrecipitationType,
      unit: location.DailyForecasts[0].Temperature.Maximum.Unit
    };
    this.favoriteLocation = {id: location['id'], name: location['name']};
    this.store.dispatch(new favoriteActions.AddToFavorite(body));
  }

  removeFromFavorite(key: number): void {
    this.favoriteLocation = {id: null, name: ''};
    this.store.dispatch(new favoriteActions.RemoveFromFavorite(key));
  }

}

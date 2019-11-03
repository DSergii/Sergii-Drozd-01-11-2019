import { Component } from '@angular/core';

/**
 * models
 */
import {Forecast} from '../models/forecast.model';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {

  public forecast: Forecast;

  constructor() {}

}

import {DailyForecast} from './daily-forecast.model';

export interface Forecast {
  id?: number;
  name?: string;
  Headline: {
    EffectiveDate: string;
    EffectiveEpochDate: number;
    Severity: number;
    Text: string;
    Category: string;
    EndDate: string;
    EndEpochDate: number;
    MobileLink: string;
    Link: string;
  },
  DailyForecasts: Array<DailyForecast>
}
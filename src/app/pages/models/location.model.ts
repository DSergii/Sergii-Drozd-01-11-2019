import {Forecast} from './forecast.model';

export interface Location {
  id: number;
  name: string;
  temperature: number;
  icon: number;
  iconPhase: string;
  precipitationType: string;
  unit: string;
}
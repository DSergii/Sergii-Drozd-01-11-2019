export interface SingleForecast {
  EpochTime: number;
  HasPrecipitation: boolean;
  IsDayTime: boolean;
  Link: string;
  LocalObservationDateTime: string;
  MobileLink: string;
  PrecipitationType: null
  Temperature: {
    Metric: {
      Value: number;
      Unit: string;
      UnitType: number;
    },
    Imperial: {
      Value: number;
      Unit: string;
      UnitType: number;
    }
  }
  Imperial: {
    Value: number;
    Unit: string;
    UnitType: number;
  }
  Unit: string;
  UnitType: number;
  Value: number;
  Metric: {
    Value: number;
    Unit: string;
    UnitType: number;
  }
  WeatherIcon: number;
  WeatherText: string;
  LocalizedName?: string;
}
export interface DailyForecast {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: {
      Value: number;
      Unit: string;
      UnitType: number;
    },
    Maximum: {
      Value: number;
      Unit: string;
      UnitType: number;
    }
  },
  Day: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationIntensity: string;
    PrecipitationType: string;
  },
  Night: {
    Icon: number;
    IconPhrase: string;
    HasPrecipitation: boolean;
    PrecipitationType: string;
    PrecipitationIntensity: string;
  },
  Sources: Array<string>;
  MobileLink: string;
  Link: string;
}
import { CurrentWeatherData } from './CurrentWeatherData.model';
import { DailyWeatherData } from './DailyWeatherData.model';

export class ForecastServiceResponse {
  public current: CurrentWeatherData;
  public daily: DailyWeatherData[];
}

import { Weather } from './Weather.model';
import { FeelsLikeData } from './FeelsLikeData.model';
import { TempData } from './TempData.model';

export class DailyWeatherData {
  public feels_like: FeelsLikeData;
  public humidity: number;
  public temp: TempData;
  public weather: Weather[];
  public wind_deg: number;
  public wind_speed: number;
  public dt: number;
}

import { Weather } from './Weather.model';

export class CurrentWeatherData {
  public feels_like: number;
  public humidity: number;
  public temp: number;
  public weather: Weather[];
  public wind_deg: number;
  public wind_speed: number;
}

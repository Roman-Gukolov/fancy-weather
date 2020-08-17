import { Component, OnInit } from '@angular/core';
import { ForecastServiceResponse } from '../model/weather/ForecastServiceResponse.model';
import * as moment from 'moment';
import { LanguageService } from '../services/language.service';
import { ForecastService } from '../services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast-block.component.html',
  styleUrls: ['./forecast-block.component.css']
})
export class ForecastBlockComponent implements OnInit {

  public weather: ForecastServiceResponse;

  constructor(private languageService: LanguageService, private forecastService: ForecastService) {}

  ngOnInit(): void {
  }

  public setWeather(weather: ForecastServiceResponse): void {
    this.weather = weather;
    this.weather.daily = weather.daily.slice(1, 4);
  }

  public getIconUrl(suffix: string): string {
    return this.forecastService.getIconUrl(suffix);
  }

  public getFormattedDayOfWeek(epochDate: number): string {
    return moment(epochDate * 1000).locale(this.languageService.getLanguage()).format('dddd');
  }

  public getLikeFeelsText(): string {
    return this.languageService.getLikeFeelsText();
  }

  public getWindText(): string {
    return this.languageService.getWindText();
  }

  public getWindSpeedText(): string {
    return this.languageService.getWindSpeedText();
  }

  public getHumidityText(): string {
    return this.languageService.getHumidityText();
  }
}

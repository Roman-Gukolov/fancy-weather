import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { LatLng } from '../model/geocoding/LatLng.model';
import { ForecastService } from '../services/forecast.service';
import { GeocodingResponse } from '../model/geocoding/Geocoding.model';
import * as moment from 'moment';
import { LanguageService } from '../services/language.service';
import { ForecastServiceResponse } from '../model/weather/ForecastServiceResponse.model';
import { ForecastBlockComponent } from '../forecast-block/forecast-block.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-weather',
  templateUrl: './weather-block.component.html',
  styleUrls: ['./weather-block.component.css']
})
export class WeatherBlockComponent implements OnInit, DoCheck {
  public weather: ForecastServiceResponse;
  public location: GeocodingResponse;
  public formattedDate = '';

  public formatDate = setInterval(() => {
    this.formattedDate = moment().locale(this.languageService.getLanguage()).format('LLLL');
    if (this.languageService.getLanguage() === 'en') {
      this.formattedDate = [this.formattedDate.slice(0, this.formattedDate.length - 3), ':' + moment().second(),
        this.formattedDate.slice(this.formattedDate.length - 3)].join('');
    } else {
      this.formattedDate += ':' + moment().second();
    }
  }, 1000);

  @ViewChild(ForecastBlockComponent)
  private forecastBlock: ForecastBlockComponent;

  constructor(private forecastService: ForecastService,
              private languageService: LanguageService,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public ngDoCheck(): void {
    this.changeDetector.markForCheck();
  }

  public getWeather(latLng: LatLng): void {
    this.forecastService.getCurrentWeather(latLng).subscribe(
      (weather: ForecastServiceResponse) => {
        this.weather = weather;
        this.forecastBlock.setWeather(weather);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public setLocation(location: GeocodingResponse): void {
    this.location = location;
  }

  public setWeather(weather: ForecastServiceResponse): void {
    this.weather = weather;
    this.forecastBlock.setWeather(weather);
  }

  public getIconUrl(): string {
    return this.forecastService.getIconUrl(this.weather.current.weather[0].icon);
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

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { LocationBlockComponent } from './location-block/location-block.component';
import { WeatherBlockComponent } from './weather-block/weather-block.component';
import { GeocoderService } from './services/geocoder.service';
import { GeocodingResponse } from './model/geocoding/Geocoding.model';
import { LatLng } from './model/geocoding/LatLng.model';
import { ForecastService } from './services/forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  @ViewChild(LocationBlockComponent)
  private locationBlock: LocationBlockComponent;
  @ViewChild(WeatherBlockComponent)
  private weatherBlock: WeatherBlockComponent;

  constructor(private geocoderService: GeocoderService, private forecastService: ForecastService) {
  }

  public search($event): void {
    this.locationBlock.update($event);
    this.weatherBlock.getWeather($event);
    this.updateGeo($event);
  }

  public onMapInit($event): void {
    this.weatherBlock.getWeather($event);
    this.updateGeo($event);
  }

  public updateForecastAndLocation(): void {
    this.forecastService.getCurrentWeather(this.locationBlock.getLoc()).subscribe(
      (response) => {
        this.weatherBlock.setWeather(response);
      },
      (error) => console.log(error)
    );
    this.updateGeo(this.locationBlock.getLoc());
  }

  private updateGeo(latLng: LatLng): void {
    this.geocoderService.getReversedLocation(latLng).subscribe(
      (response: GeocodingResponse) => {
        this.weatherBlock.setLocation(response);
      },
      (error) => console.log(error)
    );
  }
}

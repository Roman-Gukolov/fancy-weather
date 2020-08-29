import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LatLng } from '../model/geocoding/LatLng.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import { ForecastServiceResponse } from '../model/weather/ForecastServiceResponse.model';

@Injectable()
export class ForecastService {
  private urlWeatherapi = 'https://api.openweathermap.org/data/2.5/';
  private urlIcon = 'https://openweathermap.org/img/wn/';
  private urlIconSuffix = '@2x.png';

  constructor(private http: HttpClient,
              private storeService: StoreService) {
  }

  public getCurrentWeather(latLng: LatLng): Observable<ForecastServiceResponse> {
    return this.http.get<ForecastServiceResponse>(this.urlWeatherapi + 'onecall'
      + '?appid=' + environment.openweathermap.key
      + '&lat=' + latLng.lat.toFixed(4)
      + '&lon=' + latLng.lng.toFixed(4)
      + '&lang=' + this.storeService.get('language')
      + '&units=' + this.storeService.get('units')
    )
      .pipe(map(this.extractWeatherResponse));
  }

  private extractWeatherResponse(res: any): any {
    return Object.assign(new ForecastServiceResponse(), res);
  }

  public getIconUrl(prefix: string): string {
    return this.urlIcon + prefix + this.urlIconSuffix;
  }

}

import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GeocodingResponse } from '../model/geocoding/Geocoding.model';

import { Observable } from 'rxjs';
import { LatLng } from '../model/geocoding/LatLng.model';
import { LanguageService } from './language.service';

@Injectable()
export class GeocoderService {
  private urlGeocoder = 'https://api.opencagedata.com/geocode/v1/json';

  constructor(private http: HttpClient, private languageService: LanguageService) {}

  public getReversedLocation(latLng: LatLng): Observable<GeocodingResponse> {
    return this.http
      .get<GeocodingResponse>(
        this.urlGeocoder
        + '?q=' + encodeURIComponent(latLng.lat + ',' + latLng.lng)
        + '&key=' + environment.opencagedata.key
        + '&pretty=1'
        + '&language=' + this.languageService.getLanguage()
      )
      .pipe(map(this.extractGeocodingResponse));
  }

  public getForwardLocation(placeName: string): Observable<GeocodingResponse> {
    return this.http
      .get<GeocodingResponse>(
        this.urlGeocoder
        + '?q=' + placeName
        + '&key=' + environment.opencagedata.key
        + '&pretty=1'
        + '&language=' + this.languageService.getLanguage()
      )
      .pipe(map(this.extractGeocodingResponse));
  }

  private extractGeocodingResponse(res: any): any {
    return Object.assign(new GeocodingResponse(), res);
  }
}

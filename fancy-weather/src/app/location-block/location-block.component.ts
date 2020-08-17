import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IpInfo } from '../model/IpInfo.model';
import { LocationService } from '../services/location.service';
import { GeocoderService } from '../services/geocoder.service';
import { environment } from '../../environments/environment';
import { GeocodingResponse } from '../model/geocoding/Geocoding.model';
import * as mapboxgl from 'mapbox-gl';
import { LatLng } from '../model/geocoding/LatLng.model';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-location',
  templateUrl: './location-block.component.html',
  styleUrls: ['./location-block.component.css'],
})
export class LocationBlockComponent implements OnInit {
  public ipInfo: IpInfo;
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  private marker = new mapboxgl.Marker({ draggable: true });
  private popup = new mapboxgl.Popup();

  @Output() locationEvent = new EventEmitter<LatLng>();

  constructor(
    private locationService: LocationService,
    private geocoderService: GeocoderService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.locationService.getCurrentLocation().subscribe(
      (ipInfo: IpInfo) => {
        this.ipInfo = ipInfo;
        this.initMapBox();
      },
      (error: any) => {
        console.log(error);
        this.initMapBox();
      }
    );
  }

  private initMapBox(latLng?: LatLng): void {
    if (!this.ipInfo && !latLng) {
      latLng = new LatLng(55.7522, 37.6156);
    }

    if (!latLng) {
      latLng = this.getLoc();
    }
    if (latLng) {
      this.updateLocByLatLng(latLng);
    }
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken').set(
      environment.mapbox.token
    );

    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [latLng.lng, latLng.lat],
    });
    this.map.addControl(new mapboxgl.NavigationControl());

    this.marker.setLngLat([latLng.lng, latLng.lat]).addTo(this.map);

    this.marker.on('dragend', () => {
      latLng = this.updateLoc(this.marker.getLngLat());
      this.geocoderService.getReversedLocation(latLng).subscribe(
          (response: GeocodingResponse) => {
            this.popup
              .setLngLat([latLng.lng, latLng.lat])
              .addTo(this.map);
            if (response.results[0]) {
              this.popup.setHTML(response.results[0].formatted);
            }
            this.locationEvent.emit(latLng);
        },
          (error) => console.log(error)
      );
    });

    this.map.on('click', () => this.popup.remove());
    this.locationEvent.emit(latLng);
  }

  public update(data: LatLng): void {
    this.popup.remove();
    this.map.setCenter(data);
    this.marker.setLngLat(data);
    this.updateLocByLatLng(data);
  }

  public getLoc(): LatLng {
    const lat = Number(this.ipInfo.loc.split(',')[0]);
    const lng = Number(this.ipInfo.loc.split(',')[1]);
    return new LatLng(lat, lng);
  }

  public getLatitudeText(): string {
    return this.languageService.getLatitudeText();
  }

  public getLongitudeText(): string {
    return this.languageService.getLongitudeText();
  }

  public getLatTrunc(): number {
    return Math.trunc(this.getLoc().lat);
  }

  public getLatDecimal(): string {
    if (this.getLoc().lat === this.getLonTrunc()) {
      return '';
    }
    return this.getLoc().lat.toString().split('.')[1].slice(0, 2);
  }

  public getLonTrunc(): number {
    return Math.trunc(this.getLoc().lng);
  }

  public getLonDecimal(): string {
    if (this.getLoc().lng === this.getLonTrunc()) {
      return '';
    }
    return this.getLoc().lng.toString().split('.')[1].slice(0, 2);
  }

  private updateLoc(mapboxLngLat: mapboxgl.LngLat): LatLng {
    if (!this.ipInfo) {
      this.ipInfo = new IpInfo();
    }
    this.ipInfo.loc = [mapboxLngLat.lat, mapboxLngLat.lng].join(',');
    return new LatLng(mapboxLngLat.lat, mapboxLngLat.lng);
  }

  private updateLocByLatLng(latLng: LatLng): void {
    if (!this.ipInfo) {
      this.ipInfo = new IpInfo();
    }
    this.ipInfo.loc = [latLng.lat, latLng.lng].join(',');
  }
}

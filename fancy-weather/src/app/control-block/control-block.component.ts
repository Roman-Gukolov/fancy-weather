import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GeocoderService } from '../services/geocoder.service';
import { GeocodingResponse } from '../model/geocoding/Geocoding.model';
import { LatLng } from '../model/geocoding/LatLng.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import * as _ from 'lodash';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from '../services/language.service';
import { StoreService } from '../services/store.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-control',
  templateUrl: './control-block.component.html',
  styleUrls: ['./control-block.component.css'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('rotated => default', animate('1000ms ease-out')),
      transition('default => rotated', animate('1000ms ease-in')),
    ]),
  ],
})
export class ControlBlockComponent implements OnInit {
  public lang: string;
  public inputCity: string;
  public state = 'default';
  public degreesCelsius = true;

  private langVisible = false;

  private readonly REVERSED = 'reversed';
  private readonly ACTIVE = 'active';

  constructor(private geocoderService: GeocoderService,
              private cookieService: CookieService,
              private languageService: LanguageService,
              private storeService: StoreService,
              private imageService: ImageService) {}

  @Output() searchEvent = new EventEmitter<LatLng>();
  @Output() updateUnitsAndLang = new EventEmitter();

  ngOnInit(): void {
    this.lang = this.languageService.getLanguage();
    this.updateLangButton(this.lang);
    const units = this.storeService.get('units');
    if (!units || units == '') {
      this.storeService.set('units', 'metric');
    } else if (units === 'imperial') {
      this.changeFromCelsius();
    }
  }

  public searchCity(): void {
    if (!this.inputCity || _.isEmpty(this.inputCity.trim())) {
      return;
    }

    this.geocoderService.getForwardLocation(this.inputCity).subscribe(
      (response: GeocodingResponse) => {
        this.searchEvent.emit(response.results[0].geometry);
        this.updateBackground();
      },
      (error) => console.log(error)
    );
  }

  public rotate(): void {
    this.state = this.state === 'default' ? 'rotated' : 'default';
    this.updateBackground();
  }

  public showLangs(): void {
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');
    const arrow = document.getElementById('arrowDown');
    if (!this.langVisible) {
      langBtn.classList.add(this.ACTIVE);
      langMenu.classList.add(this.ACTIVE);
      arrow.classList.add(this.REVERSED);
      this.langVisible = true;
    } else {
      langBtn.classList.remove(this.ACTIVE);
      langMenu.classList.remove(this.ACTIVE);
      arrow.classList.remove(this.REVERSED);
      this.langVisible = false;
    }
  }

  public changeDegrees(): void {
    const celsius = document.getElementById('buttonC');
    const fahrenheit = document.getElementById('buttonF');
    if (!this.degreesCelsius) {
      this.degreesCelsius = true;
      this.storeService.set('units', 'metric');
      celsius.classList.add(this.ACTIVE);
      fahrenheit.classList.remove(this.ACTIVE);
    } else {
      this.degreesCelsius = false;
      this.storeService.set('units', 'imperial');
      celsius.classList.remove(this.ACTIVE);
      fahrenheit.classList.add(this.ACTIVE);
    }
    this.updateUnitsAndLang.emit();
    this.updateBackground();
  }

  public selectLang(lang: string): void {
    this.updateLangButton(lang);
    this.lang = lang;
    this.languageService.setLanguage(lang);
    this.updateUnitsAndLang.emit();
    this.updateBackground();
  }

  public getSearchInputPlaceholder(): string {
    return this.languageService.getSearchInputPlaceholder();
  }

  public getSearchButtonText(): string {
    return this.languageService.getSearchButtonText();
  }

  private updateLangButton(lang: string): void {
    const currentLangBtn = document.getElementById(this.lang + 'Btn');
    const newLangBtn = document.getElementById(lang + 'Btn');
    currentLangBtn.classList.remove(this.ACTIVE);
    newLangBtn.classList.add(this.ACTIVE);
  }

  private changeFromCelsius(): void {
    this.degreesCelsius = false;
    const fBtn = document.getElementById('buttonF');
    const cBtn = document.getElementById('buttonC');
    cBtn.classList.remove(this.ACTIVE);
    fBtn.classList.add(this.ACTIVE);
  }

  private updateBackground(): void {
    this.imageService.getRandomImage().subscribe((response => {
      this.imageService.getBlob(response.urls.full).subscribe((blob) => {
        const src = `url(${window.URL.createObjectURL(blob)})`;
        document.body.style.background = 'linear-gradient(180deg,rgba(8, 15, 26, 0.59),rgba(17, 17, 46, 0.46))50% fixed,'
          + src + ' no-repeat 100% fixed';
        document.body.style.backgroundSize = 'cover';
      }, (error => console.log(error)));
    }), error => console.log(error));
  }
}

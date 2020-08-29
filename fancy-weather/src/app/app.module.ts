import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlBlockComponent } from './control-block/control-block.component';
import { WeatherBlockComponent } from './weather-block/weather-block.component';
import { LocationBlockComponent } from './location-block/location-block.component';
import { ForecastBlockComponent } from './forecast-block/forecast-block.component';
import { LocationService } from './services/location.service';
import { GeocoderService } from './services/geocoder.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from './services/language.service';
import { StoreService } from './services/store.service';
import { ForecastService } from './services/forecast.service';
import { ImageService } from './services/image.service';

const angularModules = [FormsModule, ReactiveFormsModule];

@NgModule({
  declarations: [
    AppComponent,
    ControlBlockComponent,
    WeatherBlockComponent,
    LocationBlockComponent,
    ForecastBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    angularModules,
  ],
  exports: [angularModules],
  providers: [LocationService, GeocoderService, NgForm, CookieService, LanguageService, StoreService, ForecastService, ImageService],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { StoreService } from './store.service';

@Injectable()
export class LanguageService {
  private readonly LANGUAGE = 'language';
  private readonly RU = 'ru';
  private readonly EN = 'en';
  private readonly BE = 'be';

  constructor(private storeService: StoreService) {}

  public setLanguage(lang: string): void {
    this.storeService.set(this.LANGUAGE, lang);
  }

  public getLanguage(): string {
    const lang = this.storeService.get(this.LANGUAGE);
    if (!lang) {
      this.setDefaultLanguage();
      return this.getLanguage();
    }
    return lang;
  }

  public setDefaultLanguage(): void {
    this.setLanguage(this.EN);
  }

  public getSearchInputPlaceholder(): string {
    if (this.getLanguage() === this.RU) {
      return 'Найти город';
    } else if (this.getLanguage() === this.EN) {
      return 'Find a city';
    } else if (this.getLanguage() === this.BE) {
      return 'Знайсці горад';
    }
  }

  public getSearchButtonText(): string {
    if (this.getLanguage() === this.RU) {
      return 'Поиск';
    } else if (this.getLanguage() === this.EN) {
      return 'Search';
    } else if (this.getLanguage() === this.BE) {
      return 'Пошук';
    }
  }

  public getLatitudeText(): string {
    if (this.getLanguage() === this.RU) {
      return 'Широта';
    } else if (this.getLanguage() === this.EN) {
      return 'Latitude';
    } else if (this.getLanguage() === this.BE) {
      return 'Шырата';
    }
  }

  public getLongitudeText(): string {
    if (this.getLanguage() === this.RU) {
      return 'Долгота';
    } else if (this.getLanguage() === this.EN) {
      return 'Longitude';
    } else if (this.getLanguage() === this.BE) {
      return 'Даўгата';
    }
  }

  public getLikeFeelsText(): string {
    if (this.getLanguage() === this.RU) {
      return 'Ощущается как';
    } else if (this.getLanguage() === this.EN) {
      return 'Feels like';
    } else if (this.getLanguage() === this.BE) {
      return 'Адчуваецца як';
    }
  }

  public getWindText(): string {
    if (this.getLanguage() === this.RU) {
      return 'Ветер';
    } else if (this.getLanguage() === this.EN) {
      return 'Wind';
    } else if (this.getLanguage() === this.BE) {
      return 'Вецер';
    }
  }

  public getWindSpeedText(): string {
    if (this.getLanguage() === this.RU || this.getLanguage() === this.BE) {
      return 'М/С';
    } else if (this.getLanguage() === this.EN) {
      return 'M/S';
    }
  }

  public getHumidityText(): string {
    if (this.getLanguage() === this.RU) {
      return 'Влажность';
    } else if (this.getLanguage() === this.EN) {
      return 'Humidity';
    } else if (this.getLanguage() === this.BE) {
      return 'Вільготнасць';
    }
  }
}

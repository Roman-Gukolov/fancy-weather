import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  constructor(private cookieService: CookieService) {}

  public set(key: string, value: string): void {
    this.cookieService.set(key, value);
  }

  public get(key: string): string {
    return this.cookieService.get(key);
  }
}

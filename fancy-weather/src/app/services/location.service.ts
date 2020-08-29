import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { Observable } from 'rxjs';
import { IpInfo } from '../model/IpInfo.model';

@Injectable()
export class LocationService {
  private urlIpInfo = 'https://ipinfo.io/json?token=';

  constructor(private http: HttpClient) {}

  public getCurrentLocation(): Observable<IpInfo> {
    return this.http
      .get<IpInfo>(this.urlIpInfo + environment.ipInfo.token)
      .pipe(map(this.extractIpInfo));
  }

  private extractIpInfo(res: any): any {
    return Object.assign(new IpInfo(), res);
  }
}

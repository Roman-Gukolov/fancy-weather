import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Image } from '../model/image/image.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageService {
  private urlImages = 'https://api.unsplash.com/photos/random';

  constructor(private http: HttpClient) {}

  public getBlob(imageUrl: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
      });
    return this.http.get<Blob>(imageUrl, {headers, responseType: 'blob' as 'json' }).pipe();
  }

  public getRandomImage(): Observable<Image> {
    return this.http.get<Image>(this.urlImages
      + '?query=nature,day,summer,cloudy'
      + '&client_id=' + environment.unsplash.key)
      .pipe(map(this.extractImageResponse));
  }

  private extractImageResponse(res: any): any {
    return Object.assign(new Image(), res);
  }
}
